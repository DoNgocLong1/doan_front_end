import { Space, Spin } from "antd";
import { LoadingWrapper } from "./Loading.styled";
const Loading = () => {
  return (
    <LoadingWrapper>
      <Space>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Space>
    </LoadingWrapper>
  );
};
export default Loading;
