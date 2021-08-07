export interface apiPirataResponse {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: 'pirate';
  };
}
