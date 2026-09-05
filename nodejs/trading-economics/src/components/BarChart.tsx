import { ResponsiveBar } from '@nivo/bar';

type Props = {
    data: {
        [x: string]: string | number;
    }[],
    keys: string[];
    leftLabel: string,
    bottomLabel: string,
    chartLabel: string;
};

const BarChart = ({ data, bottomLabel, leftLabel, chartLabel, keys }: Props) => (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="Index"
        layout='horizontal'
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[{
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38BCB2',
            size: 4,
            padding: 1,
            stagger: true
        }, {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#EED312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }]}
        borderColor={{
            from: 'color',
            modifiers: [[
                'darker',
                1.6
            ]]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: bottomLabel,
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: leftLabel,
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [[
                'darker',
                1.6
            ]]
        }}
        legends={[{
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [{
                on: 'hover',
                style: {
                    itemOpacity: 1
                }
            }]
        }]}
        role="application"
        ariaLabel={chartLabel}
    />
);

export default BarChart;
