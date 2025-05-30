import { Card, CardTitle, CardBody, CardFooter } from '@patternfly/react-core';

export const CardBasic: React.FunctionComponent = () => (
  <Card ouiaId="BasicCard">
    <CardTitle>Title</CardTitle>
    <CardBody>Body</CardBody>
    <CardFooter>Footer</CardFooter>
  </Card>
);
