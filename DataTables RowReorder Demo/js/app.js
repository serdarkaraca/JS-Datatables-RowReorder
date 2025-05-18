let Kisiler = [];
let dt_Kisiler;

fetch("data/kisiler.json")
    .then(res => res.json())
    .then(data => {
        Kisiler = data;
        initDataTable();
        kisilerTablosunuDoldur();
    });

function initDataTable() {
    dt_Kisiler = $('.dt_Kisiler').DataTable({
        rowReorder: true,
        responsive: false,
        columnDefs: [
            { targets: [4], visible: false },
            { orderable: true, className: 'reorder', targets: 0 },
            { orderable: false, targets: '_all' }
        ],
        order: [[0, "asc"]],
        paging: false,
        searching: false,
        info: false,
    });

    $('.dt_Kisiler').on('row-reorder', function (e, diff, edit) {
        setTimeout(() => siralariGuncelle(), 10);
    });
}

function kisilerTablosunuDoldur() {
    dt_Kisiler.clear();
    Kisiler.forEach(kisi => {
        dt_Kisiler.row.add([
            kisi.SiraNo,
            kisi.Ad,
            kisi.Soyad,
            kisi.Yas,
            kisi.ID
        ]);
    });
    dt_Kisiler.draw();
}

function siralariGuncelle() {
    dt_Kisiler.rows().every(function (rowIdx, tableLoop, rowLoop) {
        let data = this.data();
        let id = data[4];
        let kisi = Kisiler.find(k => k.ID === id);
        if (kisi) kisi.SiraNo = rowIdx + 1;
    });

    Kisiler.sort((a, b) => a.SiraNo - b.SiraNo);
    kisilerTablosunuDoldur();
}
