"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import styles from './styles.module.css';
import { monthlyExpenses, incomeData, savingsHistory, categoryColors } from './data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function FinanceDashboard() {
  // Calculate total income and expenses
  const totalIncome = Object.values(incomeData).reduce((acc, curr) => acc + curr, 0);
  const totalExpenses = Object.values(monthlyExpenses.march).reduce((acc, curr) => acc + curr, 0);
  const netAmount = totalIncome - totalExpenses;

  // Prepare data for monthly expenses chart
  const expenseChartData = {
    labels: Object.keys(monthlyExpenses.march),
    datasets: [{
      label: 'March expenses',
      data: Object.values(monthlyExpenses.march),
      backgroundColor: Object.values(categoryColors),
    }]
  };

  // Prepare data for income breakdown
  const incomeChartData = {
    labels: Object.keys(incomeData),
    datasets: [{
      data: Object.values(incomeData),
      backgroundColor: ['#2ecc71', '#3498db', '#9b59b6'],
    }]
  };

  // Prepare data for savings trend
  const savingsChartData = {
    labels: savingsHistory.map(item => item.month),
    datasets: [{
      label: 'Monthly savings',
      data: savingsHistory.map(item => item.amount),
      borderColor: '#2ecc71',
      tension: 0.4,
      fill: false,
    }]
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.navigation}>
            <a href="/" className={styles.backLink}>← Back to Home</a>
          </div>
          <h1 className={styles.title}>Personal finance dashboard</h1>
        </header>

        <div className={styles.dashboard}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <h3 className={styles.overviewTitle}>Total Income</h3>
              <div className={styles.overviewAmount}>${totalIncome.toLocaleString()}</div>
            </div>
            
            <div className={styles.overviewCard}>
              <h3 className={styles.overviewTitle}>Total Expenses</h3>
              <div className={styles.overviewAmount}>${totalExpenses.toLocaleString()}</div>
            </div>
            
            <div className={styles.overviewCard}>
              <h3 className={styles.overviewTitle}>Net {netAmount >= 0 ? 'Income' : 'Loss'}</h3>
              <div className={`${styles.overviewAmount} ${netAmount >= 0 ? styles.positive : styles.negative}`}>
                ${Math.abs(netAmount).toLocaleString()}
              </div>
            </div>
          </div>

          <div className={styles.dashboardGrid}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Savings trend</h2>
              <div className={styles.chartContainer}>
                <Line 
                  data={savingsChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    }
                  }}
                />
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Income sources</h2>
              <div className={styles.chartContainer}>
                <Doughnut 
                  data={incomeChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            <div className={`${styles.card} ${styles.expenseCard}`}>
              <h2 className={styles.cardTitle}>Expense breakdown</h2>
              <div className={styles.chartContainer}>
                <Bar 
                  data={expenseChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 