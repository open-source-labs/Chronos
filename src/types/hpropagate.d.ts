declare module 'hpropagate' {
  interface HPropagateOptions {
    propagateInResponses?: boolean;
    setAndPropagateCorrelationId?: boolean;
    headersToPropagate?: string[];
  }

  function hpropagate(options?: HPropagateOptions): void;
  
  export = hpropagate;
}
