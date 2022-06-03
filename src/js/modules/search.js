const enableSearch = () => {
	const searchInput = document.querySelector('#search-input')
	const searchBtn = document.querySelector('#search-btn')

	enableSearchElements()

	searchBtn.addEventListener('click', implementSearch)

	searchInput.addEventListener('input', () => {
		if (searchInput.value.trim() === '') {
			implementSearch()
		}
	})

	document.addEventListener('keydown', event => {
		if (event.code === 'Enter') {
			event.preventDefault()
			implementSearch()
		}
	})
}

function implementSearch() {
	const searchInput = document.querySelector('#search-input')
	const doctorOption = document.querySelector('#dropdownMenuDoctors')
	const statusOption = document.querySelector('#dropdownMenuStates')
	const allVisitCards = document.querySelectorAll('.item')
	const allClientNameElements = document.querySelectorAll('.item__name')
	const visitsContainer = document.querySelector('.desk__items-container')
	const noVisitsElement = visitsContainer.querySelector('.no-visits')

	if(noVisitsElement){noVisitsElement.remove()}

	allClientNameElements.forEach(clientNameElement => clientNameElement.innerHTML = clientNameElement.innerText)
	allVisitCards.forEach(visitCard => visitCard.closest('.col').classList.add('card-hidden'))

	const filteredByName = Array.from(allVisitCards).filter(visitCard => {
		const clientNameElement = visitCard.querySelector('.item__name')
		const clientNameElementValue = clientNameElement.innerText.toLowerCase()
		const searchInputValue = searchInput.value.toLowerCase().trim()

		if (searchInputValue === '') { return visitCard }

		if (clientNameElementValue.search(searchInputValue) !== -1) {
			let str = clientNameElement.innerText
			clientNameElement.innerHTML = insertMark(str, clientNameElementValue.search(searchInputValue), searchInputValue.length)
			return visitCard
		}
	})

	const filteredByDoctor = filteredByName.filter(el => {
		const selectedDoctor = doctorOption.innerText
		if (selectedDoctor === 'All doctors') { return el }
		return el.dataset.doctor === selectedDoctor
	})

	const filteredByStatus = filteredByDoctor.filter(el => {
		const selectedString = statusOption.innerText
		const selectedStatus = selectedString.slice(selectedString.indexOf(' ')+1).toLowerCase()
		if (selectedStatus === 'all') { return el }
		return el.dataset.status === selectedStatus
	})

	if(filteredByStatus.length === 0){
		const noVisitsFound = document.createElement('div')
		noVisitsFound.classList.add('no-visits')
		noVisitsFound.innerText = 'No visits have been found'
		visitsContainer.append(noVisitsFound)
	}

	filteredByStatus.forEach(el => {
		el.closest('.col').classList.remove('card-hidden')
	})
}

function insertMark(str, position, length) {
	return str.slice(0, position) + '<mark class="search-mark">' + str.slice(position, position + length) + '</mark>' + str.slice(position + length)
}

function enableSearchElements() {
	const allDisabled = document.querySelectorAll('[disabled=true]')
	allDisabled.forEach(el => el.disabled = false)
}

export default enableSearch