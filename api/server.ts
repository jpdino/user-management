import app from "./app";
import env from './environment'

const PORT = env.getPort();

app.listen(PORT, () => {
   console.log('Server started! Port: ' + PORT);
});
