# Agents API

Agents API is a Bun-based application that provides agentic capabilities for personal use, allowing users to leverage various AI models for information retrieval and summarization. This project offers a flexible framework for processing and synthesizing information from multiple sources, including web searches.

## Features

- Implements agentic capabilities for personal use
- Modular design allowing easy integration of different AI models
- Web search summarization using Brave Search
- Combines multiple search results into a coherent summary
- Supports streaming responses for real-time interaction
- Currently uses GPT-3.5, Llama 3.1, and Mistral AI models, with easy extensibility

## Prerequisites

- Bun runtime
- API keys for OpenAI, Groq, and Brave Search

## Installation

1. Clone the repository:

   ```
   git clone git@github.com:GuiBibeau/agents-api.git
   cd agents-api
   ```

2. Install dependencies:

   ```
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   OPENAI_API_KEY=your_openai_api_key
   GROQ_API_KEY=your_groq_api_key
   BRAVE_API_KEY=your_brave_api_key
   ```

## Usage

1. Start the server:

   ```
   bun run index.ts
   ```

2. Access the API endpoints:

   - Health check: `GET /`
   - Search and summarize: `GET /search?q=your_query&stream=true|false`

3. View API documentation:
   - Access Swagger UI: `http://localhost:8080/api-docs`

## Project Structure

- `index.ts`: Main application file
- `chat-models/`: AI model configurations (easily extendable)
- `tools/`: Search tool implementations
- `lib/`: Utility functions and configurations

## Dependencies

- express: Web server framework
- @langchain/openai: OpenAI language models
- @langchain/groq: Groq AI models
- langchain: LangChain library for building AI applications
- swagger-jsdoc and swagger-ui-express: API documentation

## Future Plans

- **Additional Tools**: Integrate more tools for diverse data sources and functionalities.
- **Model Optimization**: Fine-tune and optimize AI models for better performance.
- **Enhanced Agentic Capabilities**: Develop more sophisticated agent behaviors and decision-making processes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Do as you wish my friend.
