type MessageType = "info" | "success" | "warning" | "error"

export interface Message {
	message: string;
	type: MessageType;
	created: Date;
}

class MessageState {
	messages: Message[] = $state([])

	push(message_content: string, type: MessageType) {
		const message = {
			message: message_content,
			type: type,
			created: new Date()
		}
		this.push_message(message)
	}

	push_message(message: Message) {
		this.messages.push(message);
	}
}

export const message_state = new MessageState();
