import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { fastify } from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { authUserGoogleRoute } from './routes/auth-user-google-route'
import { createHabitRoute } from './routes/create-habit-route'
import { fetchDayRoute } from './routes/fetch-day-route'
import { env } from '@/env/env'
import { patchHabitToggleRoute } from './routes/patch-habit-toggle-route'
import { fetchSummaryRoute } from './routes/fetch-summary-route'
import { profileRoute } from './routes/profile-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'habits server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(authUserGoogleRoute)
app.register(createHabitRoute)
app.register(profileRoute)
app.register(fetchDayRoute)
app.register(fetchSummaryRoute)
app.register(patchHabitToggleRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('Running server http://localhost:3333')
})

app.ready().then(() => {
  const spec = app.swagger()

  writeFile(
    resolve(process.cwd(), 'swagger.json'),
    JSON.stringify(spec, null, 2),
    'utf-8'
  )
})
