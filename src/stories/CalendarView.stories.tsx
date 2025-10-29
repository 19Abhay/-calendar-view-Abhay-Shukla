import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from '@/components/Calendar/CalendarView';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/CalendarView',
  component: CalendarView,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    initialEvents: {
      control: { type: 'object' },
      description: 'Array of initial events to display',
    },
    initialView: {
      control: { type: 'select' },
      options: ['month', 'week'],
      description: 'Initial view mode',
    },
  },
};
export default meta;
type Story = StoryObj<typeof CalendarView>;

const sampleEvents = [
  { id: 'evt-1', title: 'Team Standup', start: new Date(), end: new Date(Date.now()+30*60000), color: '#3b82f6' },
  { id: 'evt-2', title: 'Design Review', start: new Date(), end: new Date(Date.now()+90*60000), color: '#10b981' },
];

const largeDatasetEvents = Array.from({ length: 25 }, (_, i) => ({
  id: `evt-${i + 1}`,
  title: `Event ${i + 1}`,
  start: new Date(Date.now() + (i * 24 * 60 * 60 * 1000)), // Spread over days
  end: new Date(Date.now() + (i * 24 * 60 * 60 * 1000) + 60 * 60 * 1000), // 1 hour duration
  color: `hsl(${i * 15}, 70%, 50%)`,
}));

export const Default: Story = {
  args: {
    initialEvents: sampleEvents,
  },
};

export const Empty: Story = {
  args: {
    initialEvents: [],
  },
};

export const WeekView: Story = {
  args: {
    initialEvents: sampleEvents,
    initialView: 'week',
  },
};

export const LargeDataset: Story = {
  args: {
    initialEvents: largeDatasetEvents,
  },
};

export const InteractivePlayground: Story = {
  args: {
    initialEvents: sampleEvents,
    initialView: 'month',
  },
};
