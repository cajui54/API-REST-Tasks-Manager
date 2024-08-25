const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export default {
  port: 3000,
  urlConnection: `mongodb+srv://${user}:${password}@cluster0.08wou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
};
