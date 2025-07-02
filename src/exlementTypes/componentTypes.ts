// componentTypes.ts
export const componentGroups = [
  {
    name: "Basic",
    components: [
      { type: "page-base", name: "Main Page", isContainer: true, props: {} },
      {
        type: "page-top",
        name: "Top Navbar",
        isContainer: false,
        props: {
          data: "{'logo': '../assets/imgs/express_element-logo.jpeg', 'links': [{'text': 'Home', 'url': '#home'}, {'text': 'About', 'url': '#about'}, {'text': 'Contact', 'url': '#contact'}]}",
          option:
            "{'logo': 'left', 'bgColor': '#4a90e2', 'textColor': '#ffffff'}",
        },
      },
      {
        type: "page-bottom",
        name: "Footer",
        isContainer: false,
        props: {
          data: "{'copyright': '2024 Exlement', 'links': [{'text': 'Privacy', 'url': '/privacy'}, {'text': 'Terms', 'url': '/terms'}]}",
          option:
            "{'bgColor': '#4a90e2', 'textColor': '#ffffff', 'align': 'center'}",
        },
      },
      {
        type: "page-content",
        name: "Content",
        isContainer: false,
        props: { level: "1", text: "" },
      },
      {
        type: "page-image-content",
        name: "Image Content",
        isContainer: false,
        props: { data: "{}", option: "{}" },
      },
      {
        type: "page-product-info",
        name: "Product Info",
        isContainer: false,
        props: {
          data: "{'image': 'https://unpkg.com/exlement@1.0.2/assets/imgs/basic.png', 'title': 'Rapid Development', 'text': 'Build feature-rich web applications in record time with our intuitive, HTML-like syntax and pre-built components.', 'buttonText': 'Learn More'}",
          option:
            "{'layout': 'vertical', 'bgColor': '#ffffff', 'textColor': '#333333', 'buttonColor': '#3498db', 'buttonTextColor': '#ffffff'}",
        },
      },
      {
        type: "page-team",
        name: "Team",
        isContainer: false,
        props: { data: "[]", options: "{}" },
      },
      {
        type: "page-testimonial",
        name: "Testimonial",
        isContainer: false,
        props: {
          data: "{'image': 'https://unpkg.com/exlement@1.0.0/assets/imgs/express_element-logo.jpeg', 'quote': 'Exlement has transformed our development process. We're building sophisticated web applications faster than ever, and the AI-powered components have significantly improved our productivity.', 'name': 'Jane Doe', 'role': 'Senior Web Developer'}",
          theme: "light",
        },
      },
      {
        type: "page-heading",
        name: "Heading",
        isContainer: false,
        props: {
          subtitle: "",
          title: "",
          text: "",
          "bg-color": "#f0f8ff",
          "subtitle-color": "#0066cc",
          "title-color": "#ff6600",
          "text-color": "#333333",
          "subtitle-font": "'Roboto', sans-serif",
          "title-font": "'Montserrat', sans-serif",
          "text-font": "'Open Sans', sans-serif",
          "subtitle-size": "20",
          "title-size": "48",
          "text-size": "18",
          align: "center",
          padding: "2rem",
        },
      },
    ],
  },
  {
    name: "Layout",
    components: [
      {
        type: "page-container",
        name: "Container",
        isContainer: true,
        props: {},
      },
      {
        type: "page-column",
        name: "Column",
        isContainer: true,
        props: { width: "50%" },
      },
      {
        type: "page-layout",
        name: "Layout",
        isContainer: true,
        props: {
          column: "2",
          options: "{ 'gap': '24px', 'align': 'stretch', 'justify': 'space-between', 'padding': '2rem', 'background': '#f9f9f9' }",
          "custom-css": "{ 'borderRadius': '8px', 'boxShadow': '0 2px 8px rgba(0,0,0,0.05)' }"
        },
      },
      {
        type: "page-card-layout",
        name: "Card Layout",
        isContainer: true,
        props: { columns: "3", "min-card-width": "250px" },
      },
      { type: "page-card", name: "Card", isContainer: true, props: {} },
      {
        type: "page-tabs",
        name: "Tabs",
        isContainer: false,
        props: {
          tabs: "[{'title': 'Tab 1', 'content': '<p>Content for tab 1</p>'}, {'title': 'Tab 2', 'content': '<p>Content for tab 2</p>'}, {'title': 'Tab 3', 'content': '<p>Content for tab 3</p>'}]",
          theme: "light",
        },
      },
      {
        type: "page-nav-menu",
        name: "Nav Menu",
        isContainer: false,
        props: {
          items:
            "[{'text': 'Home', 'url': '#home'}, {'text': 'Products', 'submenu': [{'text': 'Category 1', 'url': '#cat1'}, {'text': 'Category 2', 'url': '#cat2'}]}, {'text': 'About', 'url': '#about'}]",
          theme: "light",
          animation: "fade",
          logo: "",
          "logo-position": "left",
        },
      },
      {
        type: "page-image-gallery",
        name: "Image Gallery",
        isContainer: false,
        props: {
          layout: "grid",
          columns: "3",
          images:
            "[{'src': 'https://picsum.photos/450/300?random=1', 'alt': 'Description 1'}, {'src': 'https://picsum.photos/450/300?random=2', 'alt': 'Description 2'}, {'src': 'https://picsum.photos/450/300?random=3', 'alt': 'Description 3'}]",
          "slide-interval": "5000",
        },
      },
    ],
  },
  {
    name: "AI",
    components: [
      {
        type: "page-proofreader",
        name: "Proofreader",
        isContainer: false,
        props: {
          "ai-type": "openai",
          model: "",
          "server-url": "",
          "response-key": "",
        },
      },
      {
        type: "page-content-generator",
        name: "Content Generator",
        isContainer: false,
        props: {
          "server-url": "",
          "ai-type": "openai",
          model: "",
          "custom-prompt": "",
        },
      },
      {
        type: "page-chat",
        name: "Chat",
        isContainer: false,
        props: {
          "server-url": "",
          "chat-type": "default",
          model: "",
          "response-key": "",
        },
      },
      {
        type: "page-ai-code-editor",
        name: "AI Code Editor",
        isContainer: false,
        props: {
          "ai-type": "openai",
          model: "",
          "server-url": "",
          language: "javascript",
        },
      },
      {
        type: "page-translator",
        name: "Translator",
        isContainer: false,
        props: { data: "{}", options: "{}", model: "" },
      },
    ],
  },
  {
    name: "Transformers (TX)",
    components: [
      {
        type: "page-tx-generator",
        name: "TX Generator",
        isContainer: false,
        props: {
          model: "Xenova/LaMini-Flan-T5-783M",
          task: "feature-extraction",
          quantized: "true",
        },
      },
      {
        type: "page-tx-speech-to-text",
        name: "TX Speech to Text",
        isContainer: false,
        props: {
          options:
            "{'title': 'Speech to Text Converter', 'primaryColor': '#4285F4'}",
          model: "Xenova/whisper-tiny.en",
        },
      },
      {
        type: "page-tx-image-captioner",
        name: "TX Image Captioner",
        isContainer: false,
        props: {
          model: "",
          options:
            "{'title': 'Custom Image Captioner', 'primaryColor': '#FF5722', 'secondaryColor': '#FF9800', 'backgroundColor': '#FBE9E7', 'textColor': '#212121', 'borderColor': '#FFCCBC', 'fontFamily': 'Arial, sans-serif', 'uploadButtonText': 'Choose an Image'}",
        },
      },
      {
        type: "page-tx-chat",
        name: "TX Chat",
        isContainer: false,
        props: {
          model: "Xenova/LaMini-Flan-T5-783M",
          theme: "light",
          placeholder: "Type a message",
          "send-button-text": "Send",
          task: "text2text-generation",
        },
      },
      {
        type: "page-txonn-chat",
        name: "TXONN Chat",
        isContainer: false,
        props: {
          model: "Xenova/LaMini-Flan-T5-783M",
          theme: "light",
          placeholder: "Type a message",
          "send-button-text": "Send",
          task: "text-generation",
        },
      },
      {
        type: "page-voice-ai-assistant",
        name: "Voice AI Assistant",
        isContainer: false,
        props: {
          model: "Xenova/LaMini-Flan-T5-783M",
          language: "en-US",
          task: "text-generation",
          theme: "modern",
          title: "AI Assistant",
          "show-transcript": "true",
          height: "400px",
          width: "100%",
          background: "",
          "max-history": "5",
        },
      },
    ],
  },
];
