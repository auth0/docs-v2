// Complete flow data from Manhattan
export const flows = {
  "async-auth": {
    id: "async-auth",
    name: "Async Authorization",
    staticImage: {
      light:
        "https://cdn.auth0.com/website/auth0-ai/assets/diagrams/async-auth-light.png",
      dark: "https://cdn.auth0.com/website/auth0-ai/assets/diagrams/async-auth-dark.png",
    },
    steps: [
      {
        id: "step-1",
        title: "User initiates the flow",
        description:
          'In this first step, the user initiates the flow by issuing a natural language instruction to the AI agent. For example: "Buy tickets for event when available."\n\n- **Intent Expression:** The user specifies the desired automation — purchasing event tickets when they become available.\n- **Input Capture:** The AI agent receives the request and records the parameters (event type, ticket availability trigger).\n\nThis step establishes the user\'s request and schedules the background task.',
        image: "async_auth_step_1",
      },
      {
        id: "step-2",
        title: "AI agent monitors for availability",
        description:
          "The AI agent begins monitoring the external ticketing system for availability.\n\n- **Polling Process:** The agent continuously polls the events API, waiting for a matching event state (tickets available).\n- **Event Trigger:** When the tickets are released, the system captures this state change.\n\nThis step ensures the AI agent can act immediately when the desired tickets become available.",
        image: "async_auth_step_2",
      },
      {
        id: "step-3",
        title: "Agent requests authorization",
        description:
          "Once availability is confirmed, the AI agent requests explicit authorization from the user before executing the purchase.\n\n- **Authorization Request:** The user receives a notification with clear options to approve or deny the purchase.\n- **Consent Capture:** The system waits for the user's approval before proceeding.\n\nThis step enforces user control, preventing unintended or automated purchases without consent.",
        image: "async_auth_step_3",
      },
      {
        id: "step-4",
        title: "Agent completes purchase",
        description:
          'If the user approves, the AI agent proceeds with the purchase workflow.\n\n- **Permission Validation:** Auth0 AI validates the user\'s approval and grants the necessary permission.\n- **Execution:** The AI agent executes the "Buy Tickets" action with the event provider.\n- **Result Delivery:** The user is notified of the transaction outcome and receives the event tickets.\n\nThis completes the flow, fulfilling the original request while maintaining security and transparency.',
        image: "async_auth_step_4",
      },
    ],
  },

  "calling-apis": {
    id: "calling-apis",
    name: "Calling APIs",
    staticImage: {
      light:
        "https://cdn.auth0.com/website/auth0-ai/assets/diagrams/calling-apis-light.png",
      dark: "https://cdn.auth0.com/website/auth0-ai/assets/diagrams/calling-apis.png",
    },
    steps: [
      {
        id: "step-1",
        title: "User initiates the flow",
        description:
          "In this first step, the user initiates the flow by making a natural language request to the AI agent. The request is a plain-text instruction like: \"Add doctor's appointment next Friday, 2 p.m.\"\n\n- **Intent Expression:** The user communicates their goal — creating a new calendar appointment — in natural language.\n- **Input Capture:** The AI agent receives this request and extracts structured details such as the event type (doctor's appointment), date (next Friday), and time (2 p.m.).\n\nThis step establishes the user's intent, enabling the AI agent to select the appropriate tool to act on the request.",
        image: "calling_api_step_1",
      },
      {
        id: "step-2",
        title: "AI agent invokes tool",
        description:
          "The AI agent invokes the Add to Calendar tool. Before executing, authorization must be validated.\n\n- **Tool Invocation:** The agent routes the structured request into the calendar integration flow.\n- **Authorization Check:** Auth0 AI intercepts the tool call to ensure the operation is permitted.\n\nThis guarantees that the user's request cannot proceed without secure validation.",
        image: "calling_api_step_2",
      },
      {
        id: "step-3",
        title: "Authorization process begins",
        description:
          "Auth0 AI begins the secure authorization process.\n\n- **User Authentication:** The user must prove their identity.\n- **User Consent:** The system requests explicit approval to allow the AI agent to add the event to the calendar.\n\nThis ensures user awareness and control, enforcing trust and compliance.",
        image: "calling_api_step_3",
      },
      {
        id: "step-4",
        title: "Token exchange completed",
        description:
          "Once the user is authenticated and has given consent, Auth0 AI completes a token exchange to issue valid credentials.\n\n- **Token Generation:** A secure access token for the Calendar API is created.\n- **Delegation:** The AI agent receives the token, enabling it to perform the requested action.\n\nThis step bridges identity and API access securely.",
        image: "calling_api_step_4",
      },
      {
        id: "step-5",
        title: "AI agent executes action",
        description:
          "The AI agent executes the calendar action.\n\n- **API Call:** Using the valid token, the Add to Calendar tool calls the Calendar API.\n- **Action:** The requested appointment is created in the user's calendar.\n\nThis is the operational step where the actual scheduling occurs.",
        image: "calling_api_step_5",
      },
      {
        id: "step-6",
        title: "Result delivered to user",
        description:
          "The AI agent delivers the result back to the user.\n\n- **Result Notification:** The user receives confirmation that the event was successfully added.\n- **Output:** The appointment details (doctor's appointment, next Friday at 2 p.m.) are displayed.\n\nThis completes the flow by confirming execution and ensuring visibility of the scheduled event.",
        image: "calling_api_step_6",
      },
    ],
  },

  "fga-for-rag": {
    id: "fga-for-rag",
    name: "Authorization for RAG",
    staticImage: {
      light:
        "https://cdn.auth0.com/website/auth0-ai/assets/diagrams/rag-light.png",
      dark: "https://cdn.auth0.com/website/auth0-ai/assets/diagrams/rag-dark.png",
    },
    steps: [
      {
        id: "step-1",
        title: "User initiates the flow",
        description:
          'In this first step, the user initiates the flow by making a natural language request to the AI agent. The request is a plain-text instruction like: "Show me ACME forecast."\n\n- **Intent Expression:** The user communicates their intent — retrieving forecast data — without referencing technical tools or document sources.\n- **Input Capture:** The AI agent receives the query and parses the key instruction (ACME forecast).\n\nThis step sets the stage for the AI agent to determine which tool should be used to satisfy the request.',
        image: "rag_1",
      },
      {
        id: "step-2",
        title: "AI agent invokes Forecast tool",
        description:
          "The AI agent invokes the Forecast tool to fulfill the request. This tool relies on external data retrieval capabilities.\n\n- **Tool Invocation:** The AI agent routes the user's query to the Forecast tool.\n- **Action:** The tool initiates a semantic search process to locate relevant documents in the vector database.\n\nThis step bridges the user request with the backend knowledge base.",
        image: "rag_2",
      },
      {
        id: "step-3",
        title: "Semantic search retrieves documents",
        description:
          'The system performs a semantic search against the vector database to retrieve candidate documents related to the query.\n\n- **Information Retrieval:** The semantic search locates documents that match the meaning of the request ("ACME forecast").\n- **Output:** A set of relevant documents is returned.\n\nThis ensures the AI agent has content to ground its response in contextually accurate data.',
        image: "rag_3",
      },
      {
        id: "step-4",
        title: "FGA filters documents by permissions",
        description:
          "Auth0 AI applies Fine-Grained Authorization (FGA) to filter documents based on user permissions.\n\n- **Access Control Enforcement:** Documents are evaluated against the requesting user's access rights.\n- **Filtering:** Only the subset of documents the user is authorized to view is passed forward.\n\nThis ensures that the AI's answer is both relevant and compliant with security constraints.",
        image: "rag_4",
      },
      {
        id: "step-5",
        title: "AI agent generates response",
        description:
          "The AI agent generates a final response using the filtered documents.\n\n- **Answer Generation:** The relevant and permitted documents are used to compose a grounded forecast response.\n- **Output Delivery:** The AI agent provides the user with the requested forecast in natural language.\n\nThis completes the flow, delivering an accurate, permission-compliant answer to the user.",
        image: "rag_5",
      },
    ],
  },
};
