import React from 'react';

type DashBoardPropsType = {
  layout?: string;
};

const DashBoard: React.FC<DashBoardPropsType> = () => {
  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  );
};

export default DashBoard;
