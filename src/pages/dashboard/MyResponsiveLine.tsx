// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
//@ts-nocheck
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
interface IMyResponsiveLineProps {
    data: any;
}

const MyResponsiveLine = ( {data} :IMyResponsiveLineProps ) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        textColor="white"
        yFormat=" >-.2f"
        curve={'cardinal'}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        colors={{ scheme: 'yellow_green' }}

        pointSize={5}
        lineWidth={1}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableGridX={false}
        areaOpacity={0.1}
        areaBlendMode="lighten"
        tickValues={5}
        theme={
            {
                grid: {
                    line: {
                        stroke: 'rgba(167, 175, 175, 0.17)',
                    }
                },
                // set axis text color
                axis: {
                    ticks: {
                        text: {
                            fill: 'rgba(167, 175, 175, 0.76)',
                            // rotate the
                        }
                    }
                },

            }


        }
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'red',
                itemTextColor: 'rgba(167, 175, 175, 0.76)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default MyResponsiveLine
