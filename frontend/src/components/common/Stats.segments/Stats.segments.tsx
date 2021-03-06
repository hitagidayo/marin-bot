import React from 'react';
import {createStyles, Progress, Box, Text, Group, Paper, SimpleGrid} from '@mantine/core';
import {DeviceAnalytics} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    progressLabel: {
        fontFamily: `Rubik, ${theme.fontFamily}`,
        lineHeight: 1,
        fontSize: theme.fontSizes.sm,
    },

    stat: {
        borderBottom: '3px solid',
        paddingBottom: 5,
    },

    statCount: {
        fontFamily: `Rubik, ${theme.fontFamily}`,
        lineHeight: 1.3,
    },

    diff: {
        fontFamily: `Rubik, ${theme.fontFamily}`,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
}));

interface StatsSegmentsProps {
    total: string;
    icon: any,
    data: {
        label: string;
        count: string;
        part: number;
        color: string;
    }[];
}

export function StatsSegments({total, data, icon:Icon}: StatsSegmentsProps) {
    const {classes} = useStyles();

    const segments = data.map((segment) => ({
        value: segment.part,
        color: segment.color,
        label: segment.part > 10 ? `${segment.part}%` : null,
    }));

    const descriptions = data.map((stat) => (
        <Box key={stat.label} sx={{borderBottomColor: stat.color}} className={classes.stat}>
            <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
                {stat.label}
            </Text>
            <Group position="apart" align="flex-end" spacing={0}>
                <Text weight={700}>{stat.count}</Text>
                <Text color={stat.color} weight={700} size="sm" className={classes.statCount}>
                    {stat.part}%
                </Text>
            </Group>
        </Box>
    ));

    return (
        <Paper withBorder p="md" radius="md">
            <Group position="apart">
                <Group align="flex-end" spacing="xs">
                    <Text size="xl" weight={700}>
                        {total}
                    </Text>
                </Group>
                <Icon size={20} className={classes.icon}/>
            </Group>

            <Text color="dimmed" size="sm">
                Card worker stats for {total}
            </Text>

            <Progress
                sections={segments as any}
                size={34}
                classNames={{label: classes.progressLabel}}
                mt={40}
            />
            <SimpleGrid cols={3} breakpoints={[{maxWidth: 'xs', cols: 1}]} mt="xl">
                {descriptions}
            </SimpleGrid>
        </Paper>
    );
}