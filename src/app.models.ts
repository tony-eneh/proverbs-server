export interface ApiResponse<Type> {
  success: boolean;
  data: Type;
  message: string;
}
