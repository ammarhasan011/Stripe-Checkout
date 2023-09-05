function Home() {
  async function handlePayment() {
    try {
      const response = await fetch(
        "http://localhost:3000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        console.error("Begäran misslyckades");
        return;
      }

      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      console.error("Ett fel inträffade:", error);
    }
  }

  return (
    <div>
      <button onClick={handlePayment}>ge mig pengar</button>
    </div>
  );
}

export default Home;
