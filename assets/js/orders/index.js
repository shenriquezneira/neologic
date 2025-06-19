
document.addEventListener("DOMContentLoaded", () => {

    const ordersBody = document.querySelector('#orders_list tbody')

    function openModal(id) {

        document.getElementById('detail_id').value = id

        fetch(`/orders/api/${id}/detail`)
            .then(response => response.json())
            .then(details => {
                loadDetails(details)

            })

        const modal = new bootstrap.Modal(document.getElementById('order_detail'))
        modal.show()
    }
    function getOrders() {
        fetch('/orders/api/home')
            .then(response => response.json())
            .then(orders => {

                orders.forEach
                    (
                        order => {
                            const row = document.createElement('tr')
                            row.innerHTML = `
                            <th>${order.id}</th>
                            <td></td>
                            <td></td>
                            <td>${order.serial}</td>
                            <td>${order.status}</td>
                            <td>${order.employee}</td>
                            <td><button class='btn btn-primary see-detail' data-id='${order.id}'>Ver Detalle</button></td>
                            `
                            ordersBody.appendChild(row)
                        }

                    )
            })

    }
    getOrders()


    document.querySelector('#orders_list').addEventListener('click', (event) => {
        if (event.target.classList.contains('see-detail')) {
            openModal(event.target.dataset.id)
        }
    })

    document.getElementById('form-detail').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(document.getElementById('form-detail'))

        console.log({ formData })

        fetch(`/orders/api/${document.querySelector('input[name="detail_id"]').value}/create-detail`, {

            method: 'POST',
            headers: {
                'X_CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value
            },
            body: new URLSearchParams(formData)

        })
            .then(response => response.json())
            .then(details => {
                document.getElementById('form-detail').reset()
                loadDetails(details)
            })
    })

    function loadDetails(details) {
        const detailsBody = document.querySelector('#details_list tbody')
        detailsBody.innerHTML = ''
        details.forEach
            (
                detail => {
                    const row = document.createElement('tr')
                    row.innerHTML = `
                            <td>${detail.description}</td>
                            <td>${detail.price}</td>
                            <td>${detail.tax}</td>
                            <td><button class='btn btn-primary detail-edit' data-id='${detail.id}'>Editar</button></td>
                            <td><button class='btn btn-primary detail-delete' data-id='${detail.id}'>Eliminar</button></td>
                            `
                    detailsBody.appendChild(row)
                }

            )
    } 

})