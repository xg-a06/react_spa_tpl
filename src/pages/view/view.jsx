import { Button } from 'antd';
import React from 'react';

const Index = (props) => {
  const { resultType, setResultType } = props;

  const clickHandler = () => setResultType('2323');
  return (
    <div>
      <Button onClick={clickHandler}>{resultType}</Button>
    </div>
  );
};

export default Index;
