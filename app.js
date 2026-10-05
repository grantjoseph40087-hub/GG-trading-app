let balance = 500;
let price = 67500;
let trades = [];

const $ = (id) => document.getElementById(id);

function money(value) {
  return "R" + value.toFixed(2);
}

function render() {
  $("balance").textContent = money(balance);

  $("price").textContent =
    "$" + price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  $("change").textContent =
    (Math.random() * 2 - 0.5).toFixed(2) + "%";

  const activity = $("activity");

  if (trades.length === 0) {
    activity.innerHTML =
      '<p class="empty">No demo trades yet.</p>';
    return;
  }

  activity.innerHTML = trades
    .map(
      (trade) => `
        <div class="activity-item">
          <span>${trade.side} • ${trade.market}</span>
          <strong>${trade.price}</strong>
        </div>
      `
    )
    .join("");
}

function trade(side) {
  const market = $("market").value;

  trades.unshift({
    side: side,
    market: market,
    price: "$" + price.toLocaleString()
  });

  if (side === "BUY") {
    balance -= 10;
  } else {
    balance += 10;
  }

  render();
}

$("buyBtn").onclick = () => trade("BUY");

$("sellBtn").onclick = () => trade("SELL");

$("market").onchange = () => {
  render();
};

$("clear").onclick = () => {
  trades = [];
  render();
};

$("savePlan").onclick = () => {
  const oldMessage = document.querySelector(".saved");

  if (oldMessage) {
    oldMessage.remove();
  }

  const message = document.createElement("div");

  message.className = "saved";
  message.textContent =
    "✓ Trading plan saved on this device";

  document.querySelector(".levels").after(message);
};

// Demo price movement
setInterval(() => {
  price = Math.max(
    1000,
    price + (Math.random() - 0.5) * 300
  );

  render();
}, 3000);

// Start app
render();
