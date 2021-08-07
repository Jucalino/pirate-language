export interface ApiPirataResponse {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: 'pirate';
  };
}
