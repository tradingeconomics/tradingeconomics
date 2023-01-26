import { Table, Badge, Link } from "@nextui-org/react";

function ImportanceBadge(props) {
    console.log(props.importance)
    switch(props.importance) {
        case 3:
            return <Badge color="error" variant="flat">High</Badge>;
        case 2:
            return <Badge color="warning" variant="flat">Medium</Badge>;
        case 1:
            return <Badge color="success" variant="flat">Low</Badge>;

    }
}

export default function Events(props) {
  
  return (
    <Table
      aria-label="Country upcoming events table"
      css={{
        height: "auto",
        minWidth: "100%"
      }}
      selectionMode="single"
    >
      <Table.Header>
        <Table.Column>Category</Table.Column>
        <Table.Column>Date</Table.Column>
        <Table.Column>Event Type</Table.Column>
        <Table.Column>Source</Table.Column>
        <Table.Column>Importance</Table.Column>
        <Table.Column>Previous</Table.Column>
        <Table.Column>Forecast</Table.Column>
        <Table.Column>Unit</Table.Column>
      </Table.Header>
      <Table.Body>
        {props.events.filter(item => item.Event).map((item,idx) => {
            return (
            <Table.Row key={idx} css={{
                fontSize: '10px'
              }}>
                <Table.Cell>{item.Category}</Table.Cell>
                <Table.Cell>{(new Date(item.Date)).toDateString()}</Table.Cell>
                <Table.Cell>{item.Event}</Table.Cell>
                <Table.Cell><Link isExternal href={item.SourceURL}>{item.Source}</Link></Table.Cell>
                <Table.Cell><ImportanceBadge css={{
                    fontSize: '8px !important'
                }} importance={item.Importance}></ImportanceBadge></Table.Cell>
                <Table.Cell>{item.Previous}</Table.Cell>
                <Table.Cell>{item.Forecast}</Table.Cell>
                <Table.Cell>{item.Unit}</Table.Cell>
            </Table.Row>
            );
        })}
      </Table.Body>
    </Table>
  );
}
