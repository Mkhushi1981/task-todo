import React from 'react'
import MainLayout from "../components/layout/MainLayout";
import TaskBoard from "../components/board/TaskBoard";


const Dashboard = () => {
  return (
    <MainLayout>
      <TaskBoard />
    </MainLayout>
  )
}

export default Dashboard
