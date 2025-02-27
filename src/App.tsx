import { Container, Button, Text, Form } from "./ui"

const App = () => {
  return (
    <div>
      <Text.H1 className="text-red-600">App</Text.H1>
      <Text.H2 className="text-yellow-400">App</Text.H2>
      <Text.P>App</Text.P>

      <Container.Col className="border gap-y-5">
        <p>123123</p>
        <p>123123</p>
      </Container.Col>

      <Container.Row>
        <p>123123</p>
        <p>123123</p>
      </Container.Row>
      <Button.Opacity className="bg-sky-500 hover:bg-sky-400">Opacity Button</Button.Opacity>
      <Button.Pressable className="bg-teal-600">Pressable Button</Button.Pressable>

      <Form.Form onSubmit={() => console.log("submit...")}>
        <Form.Label htmlFor="rt">random text</Form.Label>
        <Form.Text id="rt" />
        <Button.Spring className="bg-red-600">Pressable Button</Button.Spring>
      </Form.Form>
    </div>
  )
}

export default App
