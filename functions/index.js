const { onSchedule } = require('firebase-functions/v2/scheduler')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getMessaging } = require('firebase-admin/messaging')

initializeApp()

exports.pushHourly = onSchedule(
  {
    schedule: '0 * * * *',
    timeZone: 'America/Sao_Paulo',
    region: 'southamerica-east1'
  },
  async () => {
    const db = getFirestore()
    const messaging = getMessaging()
    const now = new Date()
    const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const isMorning = hhmm === '08:00'

    const casas = await db.collection('casas').get()

    for (const casa of casas.docs) {
      const [tokensSnap, medsSnap, contasSnap] = await Promise.all([
        casa.ref.collection('fcmTokens').get(),
        casa.ref.collection('meds').get(),
        casa.ref.collection('contas').get()
      ])

      const tokens = tokensSnap.docs.map((item) => item.data().token).filter(Boolean)
      if (!tokens.length) continue

      const notifications = []

      for (const item of medsSnap.docs) {
        const med = { id: item.id, ...item.data() }
        const times = String(med.times || '').split(/[,;/]/).map((value) => value.trim()).filter(Boolean)

        if (times.includes(hhmm)) {
          notifications.push({
            title: `💊 Hora do ${med.name}`,
            body: `${med.dosage || ''} · ${med.frequency || ''}`.trim()
          })
        }

        if (isMorning && Number(med.qty) <= Number(med.alertQty || 0)) {
          notifications.push({
            title: Number(med.qty) <= 0 ? '🚨 Estoque crítico' : '⚠️ Estoque baixo',
            body: `${med.name} — ${Number(med.qty) <= 0 ? 'acabou' : `${med.qty} unidades restantes`}`
          })
        }
      }

      if (isMorning) {
        for (const item of contasSnap.docs) {
          const conta = item.data()
          if (conta.paga) continue

          const diff = Math.ceil((new Date(conta.vencimento) - now) / 86400000)
          if (diff <= 3) {
            notifications.push({
              title: diff < 0 ? '🚨 Conta vencida' : '⚠️ Conta próxima do vencimento',
              body: `${conta.nome} — R$ ${Number(conta.valor || 0).toFixed(2)}`
            })
          }
        }
      }

      for (const notification of notifications) {
        await messaging.sendEachForMulticast({
          tokens,
          notification,
          android: {
            priority: 'high',
            notification: {
              channelId: 'nossa-casa',
              sound: 'default'
            }
          },
          apns: {
            payload: {
              aps: {
                sound: 'default'
              }
            }
          }
        })
      }
    }
  }
)
