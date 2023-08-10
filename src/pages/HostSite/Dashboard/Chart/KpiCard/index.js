//
import {
  BadgeDelta,
  Card,
  Grid,
  DeltaType,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from '@tremor/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Kpi = {
  title: string,
  metric: string,
  progress: number,
  target: string,
  delta: string,
  deltaType: DeltaType,
};

const kpiData: Kpi[] = [
  {
    title: 'Profit',
    metric: '$ 12,699',
    progress: 15.9,
    target: '$ 80,000',
    delta: '13.2%',
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Cancelled',
    metric: '45,564',
    progress: 36.5,
    target: '125,000',
    delta: '23.9%',
    deltaType: 'increase',
  },
  {
    title: 'Customers',
    metric: '1,072',
    progress: 53.6,
    target: '2,000',
    delta: '10.1%',
    deltaType: 'moderateDecrease',
  },
];

export default function KpiCard() {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        'https://103.184.113.181:447/kpi/customer?hotel_id=10'
      );
      setCustomerData(res.data);
    };
    fetchData();
  }, []);
  console.log(customerData);
  return (
    <Grid numColsLg={3} className="gap-6 mt-6">
      {kpiData.map((item) => (
        <Card key={item.id}>
          <Flex alignItems="start">
            <div className="truncate">
              <Text>{item.title}</Text>
              <Metric className="truncate">{item.metric}</Metric>
            </div>
            <BadgeDelta deltaType="increase">{item.delta}</BadgeDelta>
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
            <Text>{item.target}</Text>
          </Flex>
          <ProgressBar
            percentageValue={item.progress}
            color="purple"
            className="mt-2"
          />
        </Card>
      ))}
    </Grid>
  );
}
