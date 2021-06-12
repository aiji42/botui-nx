import { Handler } from 'aws-lambda'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { Server } from 'http'
import { ExpressAdapter } from '@nestjs/platform-express'
import { createServer, proxy } from 'aws-serverless-express'
import * as express from 'express'

let cachedServer: Server

async function bootstrapServer(): Promise<Server> {
  const expressApp = express()
  const adapter = new ExpressAdapter(expressApp)
  const nestApp = await NestFactory.create(AppModule, adapter)
  nestApp.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
  })
  await nestApp.init()
  return createServer(expressApp)
}

export const handler: Handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer()
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise
}
