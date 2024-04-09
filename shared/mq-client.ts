import { MQSingleChannel } from './channel-handlers/mq-single-channel'
import amqlib from 'amqplib'
import { AbstractMessageQueueClient } from './abstract/abstract-mq-client'

export class MessageQueueClient extends AbstractMessageQueueClient {
	async connect() {
		await this.connectWithRetry(async () => {
			return await amqlib.connect(process.env.RABBITMQ_URL!)
		})
	}

	async createSingleChannel<T>(
		channelName: string
	): Promise<MQSingleChannel<T>> {
		const channel = await this.createChannel()
		await channel.assertQueue(channelName)
		return new MQSingleChannel(this, channel, channelName)
	}

	private async createChannel() {
		if (!this.client) {
			throw new Error('Client not properly initialized')
		}
		return await this.client.createChannel()
	}
}

