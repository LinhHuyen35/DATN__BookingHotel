import { Card, Title, DonutChart, Button, Flex } from '@tremor/react';

const rate = [
    {
        name: 'New York',
        vote: 9800,
    },
    {
        name: 'London',
        vote: 4567,
    },
    {
        name: 'Hong Kong',
        vote: 3908,
    },
    {
        name: 'San Francisco',
        vote: 2400,
    },
    {
        name: 'Singapore',
        vote: 1908,
    },
];

//const valueFormatter = (number) => ` ${Intl.NumberFormat('us').format(number).toString()}`;

export const RoundChart = () => (
    <Card>
        <Title>Vote</Title>
        <DonutChart
            className="mt-6 h-96 "
            data={rate}
            category="vote"
            index="name"
            variant="pie"
            showLabel="true"
            colors={['red', 'amber', 'indigo', 'lime', 'slate']}
        />
        <Flex justifyContent="end" className="space-x-2">
            <Button size="xs" variant="primary" onClick={() => console.log('clicked')}>
                View more
            </Button>
        </Flex>
    </Card>
);
