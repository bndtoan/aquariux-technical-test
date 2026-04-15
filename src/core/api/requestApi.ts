import { AsyncResponseTransform } from "apisauce"
import { Alert } from "react-native";
import createApiService from "./createApiService";

const requestApi = () => {
  const responseTransform: AsyncResponseTransform = async (response) => {
    if (response.ok) return;

    const statusCode = response.data['status_code'] || -1;
    const statusMessage = response.data['status_message'] || '';
    Alert.alert('Error', `${statusMessage} (${statusCode})`);
  }

  const apiService = createApiService();
  apiService.addAsyncResponseTransform(responseTransform);

  return apiService;
}

export default requestApi();