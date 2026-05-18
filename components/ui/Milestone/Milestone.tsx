import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';

export default function Milestone() {
  return (
    <Timeline className="max-h-[200px]">
      <TimelineItem>
        <TimelineSeparator>
          <div className="rounded-full bg-alizarin-crimson-red-51 flex items-center justify-center h-7 w-7 font-bold text-white">1</div>
          <TimelineConnector className="h-13" />
        </TimelineSeparator>
        <TimelineContent>
            <div className="-translate-y-1">
              <p className="font-semibold">Paiement Sequestre</p>
              <small className="text-scarpa-flow-gray-34">En attente de votre action</small>
            </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <div className="rounded-full bg-iron-2-gray-84 flex items-center justify-center h-7 w-7 font-bold text-scarpa-flow-gray-34">2</div>
          <TimelineConnector/>
        </TimelineSeparator>
        <TimelineContent>
          <div className="-translate-y-1">
            <p className="text-scarpa-flow-gray-34">Exécution de la Mission</p>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator className="w-max">
          <div className="rounded-full bg-iron-2-gray-84 flex items-center justify-center h-7 w-7 font-bold text-scarpa-flow-gray-34">3</div>
        </TimelineSeparator>
        <TimelineContent className="">
          <div className="-translate-y-1">
            <p className="text-scarpa-flow-gray-34">Validation & Déblocage</p>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}