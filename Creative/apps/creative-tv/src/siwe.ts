import { configureSIWE } from 'connectkit-next-siwe'
import { SESSION_PASSWORD } from './utils/config'

export const siwe = configureSIWE({
  session: { password: SESSION_PASSWORD },
  apiRoutePrefix: '/api/siwe',
})
