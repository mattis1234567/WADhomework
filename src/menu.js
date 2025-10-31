(function () {
	document.addEventListener("click", (event) => {
		const dropdown = document.querySelector(".dropdown");
		if (!dropdown) return;

		const clickedTrigger = event.target.closest(".dropdown img");
		const clickedDropdown = event.target.closest(".dropdown");

		if (clickedTrigger) {
			dropdown.classList.toggle("open");
			return;
		}

		if (!clickedDropdown) {
			dropdown.classList.remove("open");
		}
	});
})();
