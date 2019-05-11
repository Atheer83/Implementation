from Feature_Request_App import db, create_app

db.create_all(app=create_app())
app = create_app()


if  __name__ == "__main__":
    app.run(debug=True)