"""
    Website Development and Databases
    Horizon Hotels
    Cameron Povey
    21011010
"""
from ssl import OP_NO_RENEGOTIATION
from turtle import clear
from flask import (
    Flask,
    flash,
    request,
    redirect,
    render_template,
    session,
    url_for,
    abort
)
from passlib.hash import sha256_crypt
from markupsafe import re
from sqlalchemy import false, null, true
import dbfunc, mysql.connector, cursor, schedule, os, re
from mysqlx import Session, Statement
from mysql.connector import Error
from datetime import datetime, date, timedelta

conn = dbfunc.getConnection()
dbcursor = conn.cursor()
app = Flask(__name__, template_folder='templates')
app.config.from_object(__name__)

dbname = 'cameron2povey'
usertablename = 'User'
bookingtable = 'Booking'
infotable = 'Info'
acctable = 'Accomodation'
email = None
app.secret_key = "KEY"


#register_statement = 'INSERT INTO ' + usertablename + ' (First_Name, Last_Name, Email) VALUES (%s, %s, %s);'
register_statement = 'INSERT INTO ' + usertablename + ' (First_Name, Last_Name, Email, salt, Password) VALUES (%s, %s, %s, %s, %s);'
#change_statement = 'UPDATE ' + usertablename + ' First_Name = %s, Last_Name = %s, Email = %s WHERE id = (id) VALUES(%s);'
change_statement = 'UPDATE ' + usertablename + ' SET First_Name = %s, Last_Name = %s, Email = %s WHERE Email = %s;'
#(User_ID,Hotel_ID,Order_Date) VALUES (%s,%s,%s);
bookings_statement = 'INSERT INTO ' + bookingtable + ' (User_ID,Hotel_ID,Order_Date) VALUES (%s,%s,%s);'
info_statement = 'INSERT INTO ' + infotable + ' (Booking_ID,Hotel_ID,People,Start_Date,End_Date,Currency,Cost) VALUES (%s,%s,%s,%s,%s,%s,%s)'
acc_statement = 'INSERT INTO ' + acctable + ' (Booking_ID,StandardRoom,StandouRoom,DoubleRoom,FamilyRoom) VALUES (%s,%s,%s,%s,%s)'

chars = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

@app.route('/register', methods=['POST', 'GET'])
def register():
    email = request.form['email']
    email_confirm = request.form['email_confirm']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    salt = os.urandom(24)
    #password = sha256((request.form['password']).encode('utf-8')).hexdigest()
    password = sha256_crypt.hash(request.form['password']+str(salt))
    output = sha256_crypt.verify(request.form['pass_confirm']+str(salt), password)

    #Connect to DB
    if (re.fullmatch(chars,email)):
        if email == email_confirm:
            if output:
                conn = dbfunc.getConnection()
                dbcursor = conn.cursor()
                if conn != None:
                    if conn.is_connected():
                        #Create cursor and use DB
                        print("DB Connected")
                        dbcursor.execute('USE {};'.format(dbname))

                        userdata = (first_name, last_name, email, str(salt), password)
                        dbcursor.execute(register_statement, userdata)
                        conn.commit()
                        print("Insert Statement Ran Successfully")
                        dbcursor.close()
                        conn.close()
                        flash("Created")
                        return (redirect(url_for('account')))
                    else:
                        print("DB Connection Error")
                        abort(500)
                else:
                    print("DBFunc Error")
                    abort(500)
            else:
                flash("Passwords do not match")
                return (redirect(url_for('account')))
        else:
            flash("Emails do not match")
            return (redirect(url_for('account')))
    else:
        flash("Invalid Email Adress")
        return (redirect(url_for('account')))

@app.route('/login', methods=['POST','GET'])
def login():
    #get form login
    email = request.form['email']
    uncrypt = request.form['password']
    login_statement = "SELECT * FROM " + usertablename + " WHERE Email like '" + email + "' LIMIT 100;"
    conn = dbfunc.getConnection()
    dbcursor = conn.cursor()
    if conn != None:
        print("Conned")
        dbcursor.execute('USE {};'.format(dbname))
        if conn.is_connected():
            print("DB Connected")

            dbcursor.execute(login_statement)
            print(login_statement)
            try:
                search = dbcursor.fetchone()
                print(search)
                dbcursor.close()
                conn.close()
                output = sha256_crypt.verify(uncrypt+search[4], search[5])
                if output:
                    print ("Login Successful")
                    session['id'] = search[0]
                    session['loginid'] = search[1]
                    session['lname'] = search[2]
                    session['email'] = search[3]
                    if session['id'] == 0 and session['email'] == 'admin@horizonhotels.co.uk':
                        session['admin'] = True
                    else:
                        session['admin'] = False
                    return (render_template('index.html'))
                else:
                    abort(401)
            except:
                flash("Incorrect Username or Password")
                print("=======================================================")
                dbcursor.close()
                conn.close()
                return (redirect(url_for('account')))
        else:
            print ("There you go then")

@app.route('/change', methods=['POST', 'GET'])
def change():
    email = request.form['email']
    email_confirm = request.form['email_confirm']
    first_name = request.form['fname']
    last_name = request.form['lname']

    print(first_name)

    if email == email_confirm:
        conn = dbfunc.getConnection()
        dbcursor = conn.cursor()
        if conn != None:
            if conn.is_connected():
                #Create cursor and use DB
                login_statement = "SELECT * FROM " + usertablename + " WHERE Email like '" + email + "' LIMIT 100;"
                print("DB Connected")
                dbcursor.execute('USE {};'.format(dbname))
                changedata = (first_name, last_name, email, session['email'])
                dbcursor.execute(change_statement, changedata)
                conn.commit()
                print("change Statement Ran Successfully")
                dbcursor.execute(login_statement)
                print(login_statement)

                search = dbcursor.fetchone()
                print(search)

                session['id'] = search[0]
                session['loginid'] = search[1]
                session['lname'] = search[2]
                session['email'] = search[3]

                dbcursor.close()
                conn.close()
                return (redirect(url_for('home')))
            else:
                print ("error1")
                abort(500)
        else:
            print ("error2")
            abort(500)
    else:
        print ("error3")
        abort(401)

@app.route('/cookiefalse')
def cookiefalse():
    print(session)
    session['cookie'] = False
    return (redirect(url_for('logout')))

@app.route('/cookietrue')
def cookietrue():
    session['cookie'] = True
    print(session['cookie'])
    return (redirect(url_for('home')))

@app.route('/')
def home():
    try:
        print(session)
        session.pop('bookhotel', None)
        session.pop('bookpeople', None)
        session.pop('bookstartdate', None)
        session.pop('booknights', None)
        session.pop('hotelname', None)
        session.pop('bookdou', None)
        session.pop('bookenddate', None)
        session.pop('bookfam', None)
        session.pop('bookingID', None)
        session.pop('bookrooms', None)
        session.pop('bookstan', None)
        session.pop('bookstandou', None)
        session.pop('hotelpeak', None)
        session.pop('offpeak', None)
        session.pop('peak', None)
        session.pop('rate', None)
        session.pop('ratelist', None)
        session.pop('total', None)
        session.pop('bookings', None)
        session.pop('currency', None)
        session.pop('filledDo', None)
        session.pop('filledFa', None)
        session.pop('filledSt', None)
        session.pop('hotelrates', None)
        session.pop('info', None)
        session.pop('overlap', None)
        session.pop('totalCap', None)
        print("Booking session popped!")
        if session['id'] == None:
            session.pop('nobooks', None)
            session.pop('orderDate', None)
            session.pop('rooms', None)
            session.pop('startDate', None)
            session.pop('endDate', None)
        session.pop('adfetchuserdata', None)
        session.pop('admincount', None)
        session.pop('aduserbookings', None)
        session.pop('admincountusers', None)
    except:
        print("Nothing to pop")
    print(session)
    return (render_template('index.html'))

@app.route('/logout')
def logout():
    # remove the username from the session if it is there
    print(session)
    session.pop('id', None)
    session.pop('loginid', None)
    session.pop('lname', None)
    session.pop('email', None)
    session.pop('nobooks', None)
    session.pop('orderDate', None)
    session.pop('rooms', None)
    session.pop('startDate', None)
    session.pop('endDate', None)

    print("User logged out")
    return redirect(url_for('home'))

@app.route('/account')
def account():
    if session.get('loginid') is None:
        return (render_template('account.html'))
    else:
        return ("YOU ARE ALREADY LOGGED IN")


@app.route('/admin/<power>/<data>')
def admin(power, data):
    if session['admin'] != True:
        abort(401, "Admin not found")
    else:
        conn = dbfunc.getConnection()
        dbcursor = conn.cursor()
        if conn != None:
            print("Conned")
            if conn.is_connected():
                dbcursor.execute('USE {};'.format(dbname))
                print("DB Connected")
                if data == 0:
                    abort(403, "Cant change admin!!!")
                if power == "getbook":
                    booking = "SELECT * FROM Booking WHERE Booking_ID = "+data+";"
                    dbcursor.execute(booking)
                    session['adbook'] = dbcursor.fetchone()
                    accomodation = "SELECT * FROM Accomodation WHERE Booking_ID = "+data+";"
                    dbcursor.execute(accomodation)
                    session['adacc'] = dbcursor.fetchone()
                    info = "SELECT * FROM Info WHERE Booking_ID = "+data+";"
                    dbcursor.execute(info)
                    session['adinfo'] = dbcursor.fetchone()
                    session['adfetchdata'] = True
                    dbcursor.close()
                    conn.close()
                    return redirect(url_for('myuser'))
                if power == "getuser":
                    user = "SELECT * FROM User WHERE ID = "+data+";"
                    dbcursor.execute(user)
                    session['aduser'] = dbcursor.fetchone()
                    bookings = "SELECT Booking_ID FROM Booking Where User_ID = "+data+";"
                    dbcursor.execute(bookings)
                    session['aduserbookings'] = dbcursor.fetchall()
                    #check if there are no bookings then return error
                    if len(session['aduserbookings']) == 0:
                        session['aduserbookings'] = "ZERO BOOKINGS"
                    session['adfetchuserdata'] = True
                    dbcursor.close()
                    conn.close()
                    return redirect(url_for('myuser'))
                if power == "removebook":
                    session.pop('adfetchdata', None)
                    print("DELETE FROM Accomodation WHERE Booking_ID = "+str(session['adbook'][0])+";")
                    dbcursor.execute("DELETE FROM Accomodation WHERE Booking_ID = "+str(session['adbook'][0])+";")
                    dbcursor.execute("DELETE FROM Info WHERE Booking_ID = "+str(session['adbook'][0])+";")
                    dbcursor.execute("DELETE FROM Booking WHERE Booking_ID = "+str(session['adbook'][0])+";")
                    session.pop('adfetchdata', None)
                    session.pop('adbook', None)
                    session.pop('adacc', None)
                    session.pop('adinfo', None)
                    conn.commit()
                    dbcursor.close()
                    conn.close()
                    return "removed!"
                if power == "removeuser":
                    print("HERE")
                    bookings = "SELECT Booking_ID FROM Booking Where User_ID = "+data+";"
                    dbcursor.execute(bookings)
                    #check if there are no bookings then return error
                    if len(dbcursor.fetchall()) != 0:
                        return "bookings exist"
                    else:
                        session.pop('adfetchdata', None)
                        dbcursor.execute("DELETE FROM User WHERE ID = "+data+";")
                        session.pop('aduser', None)
                        conn.commit()
                        dbcursor.close()
                        conn.close()
                        return "removed!"
                if power == "clear":
                    print("cleared")
                    session.pop('adfetchdata', None)
                    session.pop('adfetchuserdata', None)
                    session.pop('adbook', None)
                    session.pop('adacc', None)
                    session.pop('adinfo', None)
                    session.pop('aduser', None)
                    session.pop('aduserbookings', None)
                    dbcursor.close()
                    conn.close()
                    return redirect(url_for('myuser'))

@app.route('/myuser')
def myuser():
    if session['admin'] == True:
        print("Admin = True")
        conn = dbfunc.getConnection()
        dbcursor = conn.cursor()
        if conn != None:
            print("Conned")
            if conn.is_connected():
                dbcursor.execute('USE {};'.format(dbname))
                print("DB Connected")

                all = "SELECT Booking_ID,User_ID,Hotel_ID FROM Booking;"
                allusers = "SELECT ID FROM User;"

                dbcursor.execute(all)
                adminall = dbcursor.fetchall()

                dbcursor.execute(allusers)
                adminallusers = dbcursor.fetchall()

                session['admincount'] = len(adminall)
                session['admincountusers'] = len(adminallusers)
                admin = None
                dbcursor.close()
                conn.close()
                return (render_template('adminpage.html'))
    elif not session.get('loginid') is None:
        conn = dbfunc.getConnection()
        dbcursor = conn.cursor()
        #search for db
        if conn != None:
            print("Conned")
            if conn.is_connected():
                dbcursor.execute('USE {};'.format(dbname))
                print("DB Connected")

                Rates = "SELECT * FROM Rates;"
                dbcursor.execute(Rates)
                session['ratelist'] = dbcursor.fetchall()
                print(session['ratelist'])

                bookings = "SELECT Booking_ID,User_ID,Hotel_ID FROM Booking Where User_ID = "+str(session['id'])+";"
                dbcursor.execute(bookings)
                session['bookings'] = dbcursor.fetchall()

                session['nobooks'] = len(session['bookings'])
                #check if there are no bookings then return empty
                if session.get('nobooks') == 0:
                    dbcursor.close()
                    conn.close()
                    return (render_template('myuser.html'))

                orderDate = "SELECT Order_Date FROM Booking Where User_ID = "+str(session['id'])+";"
                dbcursor.execute(orderDate)
                session['orderDate'] = dbcursor.fetchall()

                bookID = "SELECT Booking_ID FROM Booking Where User_ID = "+str(session['id'])+";"
                dbcursor.execute(bookID)
                session['info'] = dbcursor.fetchall()
                dbcursor.execute(bookID)
                session['rooms'] = dbcursor.fetchall()

                print(session['info'])
                for i in range(session['nobooks']):
                    info = "SELECT * FROM Info Where Booking_ID = "+str(session['info'][i][0])+";"
                    dbcursor.execute(info)
                    session['info'][i] = dbcursor.fetchone()
                print(session['info'][0][5])

                for i in range(session['nobooks']):
                    rooms = "SELECT * FROM Accomodation Where Booking_ID = "+str(session['rooms'][i][0])+";"
                    dbcursor.execute(rooms)
                    session['rooms'][i] = dbcursor.fetchone()

                session['startDate'] = [session['info'][i][3].strftime('%d-%m-%Y') for i in range(len(session['info']))]
                session['endDate'] = [session['info'][i][4].strftime('%d-%m-%Y') for i in range(len(session['info']))]
                today = datetime.now()
                for i in range(session['nobooks']):
                    if session['endDate'][i] < datetime.strftime(today, "%d-%m-%Y"):
                        dbcursor.execute("DELETE FROM Accomodation WHERE Booking_ID = "+session['info'][0]+";")
                        dbcursor.execute("DELETE FROM Info WHERE Booking_ID = "+session['info'][0]+";")
                        dbcursor.execute("DELETE FROM Booking WHERE Booking_ID = "+session['info'][0]+";")
                    else:
                        print("NOT DELETED")

                session['orderDate'] = [session['orderDate'][i][0].strftime('%d-%m-%Y') for i in range(len(session['orderDate']))]

                dbcursor.close()
                conn.close()
                return render_template('mybookings.html')
            else:
                print ("error1")
                abort(500)
        else:
            print ("error2")
            abort (500)
    else:
        abort (401)
    

@app.route('/changeinfo')
def changeinfo():
    return (render_template('changeinfo.html'))

@app.route('/credit')
def credit():
    return (render_template('credit.html'))

@app.route('/pripol')
def pripol():
    return (render_template('pripol.html'))

@app.route('/booking')
def booking():
    return (render_template('booking.html'))

@app.route('/pay', methods=['POST','GET'])
def pay():
    if session.get("total") is None:
        return "NO BOOKING DATA FOUND"
    else:
        return (render_template('pay.html'))
        

hotelNames= ['Aberdeen',
            'Belfast',
            'Birmingham',
            'Bristol',
            'Cardiff',
            'Edinburgh',
            'Glasgow',
            'London',
            'Manchester',
            'Newcastle',
            'Norwich',
            'Nottingham',
            'Oxford',
            'Plymouth',
            'Swansea']
currency = ["GBP", "EUR", "USD"]
@app.route('/confirmation/<curid>', methods=['POST', 'GET'])
def confirmation(curid):
    today = datetime.now()
    today = today.strftime("%Y-%m-%d %X")
    session["currency"] = currency[int(curid)]
    conn = dbfunc.getConnection()
    dbcursor = conn.cursor()
    if conn != None:
            print("Conned")
            if conn.is_connected():
                dbcursor.execute('USE {};'.format(dbname))
                print("DB Connected")
                bookingdata = (session['id'],session['bookhotel'],today)
                dbcursor.execute(bookings_statement, bookingdata)
                try:
                    getBookingID = ('SELECT Booking_ID FROM '+ bookingtable +' Where Order_Date = %s AND User_ID = %s;')
                    
                    getiddata = (today, session['id'])
                    print(getiddata)
                    dbcursor.execute(getBookingID,getiddata)
                    session['bookingID'] = int(dbcursor.fetchone()[0])

                    if curid == 1: session['total'] = session['total'] * 1.2
                    elif curid == 2: session['total'] = session['total'] * 1.6

                    infodata = (session['bookingID'],session['bookhotel'],session['bookpeople'],session['bookstartdate'],session['bookenddate'],session["currency"],session['total'])
                    dbcursor.execute(info_statement, infodata)

                    accinfo = (session['bookingID'],session['bookstan'],session['bookstandou'],session['bookdou'],session['bookfam'])
                    dbcursor.execute(acc_statement, accinfo)

                    conn.commit()
                    print("Insert Statement Ran Successfully")
                except:
                    abort(400)
                dbcursor.close()
                conn.close()
            else:
                abort(500)
    return (render_template('confirmation.html'))

@app.route('/book', methods=['POST','GET'])
def book():
    #get form login
    try:
        session['bookhotel'] = request.form['hotel']
        session['booknights'] = request.form['nights']
        session['bookpeople'] = request.form['people']
        session['bookstartdate'] = request.form['startDate']
        session['hotelname'] = hotelNames[int(session['bookhotel'])]
        conn = dbfunc.getConnection()
        dbcursor = conn.cursor()
    except:
        return redirect(url_for('home'))
    conn = dbfunc.getConnection()
    dbcursor = conn.cursor()
    if conn != None:
        print("Conned")
        if conn.is_connected():
            dbcursor.execute('USE {};'.format(dbname))
            print("DB Connected")

            Rates = "SELECT * FROM Rates;"
            dbcursor.execute(Rates)
            session['ratelist'] = dbcursor.fetchall()
            print(session['ratelist'])

            Peak = "SELECT * FROM Hotel Where Hotel_ID = "+session['bookhotel']+";"
            dbcursor.execute(Peak)
            session['hotelrates'] = dbcursor.fetchone()
            session['peak'] = int(session['hotelrates'][2])
            session['offpeak'] = int(session['hotelrates'][3])

            dbcursor.close()
            conn.close()
            print(session['offpeak'], session['peak'])
            return (render_template('booking.html', hotel=session['bookhotel']))
        else:
            print ("error1")
            abort(500)
    else:
        print ("error2")
        abort(500)

@app.route('/cancel/<bookcancel>')
def cancel(bookcancel):
    if bookcancel == "ERROR":
        abort(406)
    conn = dbfunc.getConnection()
    dbcursor = conn.cursor()
    if conn != None:
        print("Conned")
        if conn.is_connected():
            dbcursor.execute('USE {};'.format(dbname))
            print("DB Connected")

            dbcursor.execute("SELECT User_ID FROM Booking WHERE Booking_ID = "+bookcancel+";")
            session['usercancel'] = dbcursor.fetchone()
            if session['usercancel'][0] == session['id']:
                session.pop('usercancel', None)
                try:
                    dbcursor.execute("DELETE FROM Accomodation WHERE Booking_ID = "+bookcancel+";")
                    dbcursor.execute("DELETE FROM Info WHERE Booking_ID = "+bookcancel+";")
                    dbcursor.execute("DELETE FROM Booking WHERE Booking_ID = "+bookcancel+";")
                    print("Booking cancelled")
                except:
                    abort(400)
            else:
                dbcursor.close()
                conn.close()
                abort(401)

            conn.commit()
            dbcursor.close()
            conn.close()
            return redirect(url_for('myuser'))

@app.route('/confirm', methods=['POST','GET'])
def confirm():
    print("YEP")
    session['bookpeople'] = request.form['people']
    session['booknights'] = request.form['nights']
    session['bookstartdate'] = request.form['startDate']
    print(session['bookstartdate'])
    
    session['bookstartdate'] = datetime.strptime(session['bookstartdate'], "%Y-%m-%d")
    session['bookenddate'] = session['bookstartdate'] + timedelta(days=int(session['booknights']))

    print(session['bookstartdate'])

    today = datetime.now()

    session['bookstan'] = request.form['bookstan']
    session['bookstandou'] = request.form['bookstandou']
    session['bookdou'] = request.form['bookdou']
    session['bookfam'] = request.form['bookfam']

    if int(session['bookstartdate'].strftime("%m")) >= 4 and int(session['bookstartdate'].strftime("%m")) <=9:
        session['rate'] = session['peak']
    else:
        session['rate'] = session['offpeak']

    diffdays = date(session['bookstartdate'].year, session['bookstartdate'].month, session['bookstartdate'].day)-date(today.year, today.month, today.day)
    print(diffdays.days)
    if diffdays.days >= 80 and diffdays.days <= 90:
        discount=0.2
    elif diffdays.days >= 60 and diffdays.days <= 79:
        discount=0.1
    elif diffdays.days >= 45 and diffdays.days <= 59:
        discount=0.05
    else:
        discount=0
    
    standardprice = (int(session['rate'])+(int(session['rate'])*(int(session['ratelist'][0][2])/100)))*int(session['bookstan'])
    standouprice = (int(session['rate'])+(int(session['rate'])*(int(session['ratelist'][1][2])/100)))*int(session['bookstandou'])
    doubleprice = (int(session['rate'])+(int(session['rate'])*(int(session['ratelist'][2][2])/100)))*int(session['bookdou'])
    familyprice = (int(session['rate'])+(int(session['rate'])*(int(session['ratelist'][3][2])/100)))*int(session['bookfam'])
    session['total'] = (standardprice+standouprice+doubleprice+familyprice)*int(session['booknights'])
    session['total'] = round(session['total']-(session['total']*discount), 2)
    print(standardprice)
    print(standouprice)
    print(doubleprice)
    print(familyprice)

    conn = dbfunc.getConnection()
    dbcursor = conn.cursor()
    if conn != None:
        print("Conned")
        if conn.is_connected():
            dbcursor.execute('USE {};'.format(dbname))
            print("DB Connected")

            today = today.strftime("%Y-%m-%d %X")

            #get leftover capacity of rooms
            totalCap = "SELECT * FROM Capacity Where Hotel_ID = "+session['bookhotel']+";"
            dbcursor.execute(totalCap)
            session['totalCap'] = dbcursor.fetchone()
            print(session['totalCap'])

            #search dates overlapping dates
            """session['bookstartdate'] = 
            session['bookenddate'] ="""
            overlap = "SELECT Booking_ID FROM Info Where Hotel_ID = "+session['bookhotel']+" AND '"+datetime.strftime(session['bookstartdate'], "%Y-%m-%d")+"' < End_Date AND '"+datetime.strftime(session['bookenddate'], "%Y-%m-%d")+"' > Start_Date;"
            dbcursor.execute(overlap)
            session['overlap'] = dbcursor.fetchall()
            print(len(session['overlap']))

            session['filledSt']=0
            session['filledDo']=0
            session['filledFa']=0
            
            for i in range(len(session['overlap'])):
                roomtypes = "SELECT * FROM Accomodation Where Booking_ID = "+str(session['overlap'][i][0])+";"
                dbcursor.execute(roomtypes)
                session['tempRooms'] = dbcursor.fetchone()
                if session['tempRooms'][1] > 0 or session['tempRooms'][2] > 0:
                    session['filledSt']+=1
                if session['tempRooms'][3] > 0:
                    session['filledDo']+=1
                if session['tempRooms'][4] > 0:
                    session['filledFa']+=1

            print(session['filledSt'], session['filledDo'], session['filledFa'])
            if (session['filledSt'] + int(session['bookstan']) + int(session['bookstandou'])) > session['totalCap'][1]:
                return("ERROR - There are not enough rooms to fufill your booking")
            if (session['filledDo'] + int(session['bookdou'])) > session['totalCap'][2]:
                return("ERROR - There are not enough rooms to fufill your booking")
            if (session['filledFa'] + int(session['bookfam'])) > session['totalCap'][3]:
                return("ERROR - There are not enough rooms to fufill your booking")
            conn.commit()
            dbcursor.close()
            conn.close()
            print(session['offpeak'], session['peak'])
            return redirect(url_for('pay'))
        else:
            print ("error1")
            abort (500)
    else:
        print ("error2")
        abort (500)

if (__name__=="__main__"):
    app.run(debug=True)

