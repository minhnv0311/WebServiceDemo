1. Link github: 
	+ Web: https://github.com/minhnv0311/WebServiceDemo
	+ Nguồn báo tự tạo, tổng hợp từ các nguồn:  https://github.com/minhnv0311/ServerWeb2
	+ Nguồn VNExpress: https://github.com/kqtl/soa
	+ Nguồn Tuổi trẻ: https://github.com/tranxuannghiep/news
2. Lịch sử phiên bản
	+ version 1: Là 1 ứng dụng web
	+ version 2: Tạo thêm các dịch vụ lấy nguồn báo từ các nơi khác (VNExpress, Tuổi trẻ)
3. Thành viên và đóng góp
	+ Dịch vụ đọc báo (Tổng hợp các bài báo từ nhiều nguồn, đọc chi tiết bài báo)
	+ Viểt tài liệu, báo cáo, API lấy báo VNExpress (sử dụng Java Spring): Nguyễn Ngọc Khánh
	+ API lấy báo Tuổi trẻ (sử dụng NodeJS): Trần Xuân Nghiệp
	+ Cài đặt, thực thi, tổng hợp nguồn báo từ nhiều nơi gửi về cho client: Nguyễn Văn Minh
	+ Thực thi (impl)/cài đặt: 
		Môi trường: 
			Server 1 (Website): AngularJS, 
			Server 2 (Nguồn báo tự tạo, tổng hợp báo từ các nguồn khác): .NET Framework, 
			Server 3 (Nguồn báo Tuổi trẻ): NodeJS Framework Express, 
			Server 4 (Nguồn báo VNExpress): Java Spring,
		Cài đặt: 
			+ Chạy Server 1 và 2 trên Internet Information Services (Windows) (localhost)
			+ Deploy server 3 lên Heroku (https://news-nghiepradeon-app.herokuapp.com)
			+ Deploy server 4 lên Heroku (https://soa2022.herokuapp.com)
		Công cụ: 
			Visual Studio 2019
			Visual Studio Code
			IntelliJ IDEA 2021.3
			Postman (test)
			Database: SQL Server (2019)
