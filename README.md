# Search Tools

Search Tools is a Bun-based application that aims to recreate Perplexity AI capabilities for personal agents, allowing users to swap in any desired AI models. This project provides a flexible framework for summarizing information from various sources, including GitHub profiles and web searches.

## Features

- Recreates Perplexity AI-like functionality for personal use
- Modular design allowing easy swap of AI models
- GitHub user profile and repository summary
- Google search summary
- Combines multiple search results into a coherent summary
- Currently uses GPT-3.5 and Mistral AI models, but can be extended to others

## Prerequisites

- Bun runtime
- API keys for OpenAI, Cloudflare, Groq, and Google Custom Search

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:GuiBibeau/search-tools.git
   cd search-tools
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   OPENAI_API_KEY=your_openai_api_key
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   CLOUDFLARE_API_KEY=your_cloudflare_api_key
   GROQ_API_KEY=your_groq_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

## Usage

1. Start the server:
   ```
   bun run index.js
   ```

2. Access the API endpoints:
   - Health check: `GET /`
   - GitHub user summary: `GET /summary/github/:userid`

## Project Structure

- `index.js`: Main application file
- `chat-models/`: AI model configurations (easily extendable)
- `tools/`: Search tool implementations
- `pipeline/`: Summary pipeline implementation

## Dependencies

- express: Web server framework
- @langchain/openai: OpenAI language models
- @langchain/cloudflare: Cloudflare AI models
- @langchain/groq: Groq AI models
- googleapis: Google APIs client library
- langchain: LangChain library for building AI applications

## Future Plans

- **Streaming Capabilities**: Implement real-time data streaming for faster and more dynamic responses.
- **Additional Tools**: Integrate more tools for diverse data sources and functionalities.
- **Innovative Ideas**: Continuously explore and add new features to enhance the application's capabilities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Do as you wish my friend.