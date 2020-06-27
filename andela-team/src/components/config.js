var url;
if (process.env.NODE_ENV !== "production") {
  url = "http://localhost:5000";
} else {
  url = "https://andela-teamwork-backend.herokuapp.com";
}
export default url;
