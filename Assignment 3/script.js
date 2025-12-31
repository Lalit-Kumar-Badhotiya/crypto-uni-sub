const name = "Lalit";
const predefinedText = `${name} says hello to blockchain`;

async function computeSHA256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
}

async function checkHash() {
  const input = document.getElementById("textInput").value;

  const predefinedHash = await computeSHA256(predefinedText);
  
  document.getElementById("originalHash").textContent = predefinedHash;

  const inputHash = await computeSHA256(input);

  document.getElementById("generatedHash").textContent = inputHash;

  const result = document.getElementById("result");
  if (inputHash === predefinedHash) {
    result.textContent = "Hash Matched";
    result.style.color = "green";
  } else {
    result.textContent = "Hash Not Matched";
    result.style.color = "red";
  }
}

document.getElementById("textInput").addEventListener("input", checkHash);


computeSHA256(predefinedText).then(hash => {
  document.getElementById("originalHash").textContent = hash;
});
