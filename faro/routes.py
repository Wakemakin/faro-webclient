from faro import app
from flask import render_template, request, flash, session, redirect, url_for
from forms import ContactForm, SignupForm, SigninForm
from flask.ext.mail import Message, Mail
from models import db, User

mail = Mail()

@app.route('/', methods=['GET', 'POST'])
def home():
	form = SigninForm()

	if request.method == 'POST':
		if form.validate() == False:
			return render_template('home.html', form=form)
		else:
			session['email'] = form.email.data
			return redirect(url_for('dash'))
			
	elif request.method == 'GET':
		return render_template('home.html', form=form)

@app.route('/about')
def about():
	return render_template('about.html')
	
@app.route('/dash')
def dash():
	if 'email' not in session:
		return redirect(url_for('signin'))
		
	user = User.query.filter_by(email = session['email']).first()
	
	if user is None:
		return redirect(url_for('signin'))
	else:
		return render_template('dash.html', user=user)
	
@app.route('/contact', methods=['GET', 'POST'])
def contact():
	form = ContactForm()
	
	if request.method == 'POST':
		if form.validate() == False:
			flash('All fields are required.')
			return render_template('contact.html', form=form)
		else:
			return render_template('contact.html', success=True)
		
	elif request.method == 'GET':
		return render_template('contact.html', form=form)
		
@app.route('/profile')
def profile():
	
	if 'email' not in session:
		return redirect(url_for('signin'))
		
	user = User.query.filter_by(email = session['email']).first()
	
	if user is None:
		return redirect(url_for('signin'))
	else:
		return render_template('profile.html', user=user)
		
@app.route('/signin', methods=['GET', 'POST'])
def signin():
	form = SigninForm()
	
	if request.method == 'POST':
		if form.validate() == False:
			return render_template('home.html', form=form)
		else:
			session['email'] = form.email.data
			return redirect(url_for('dash'))
			
	elif request.method == 'GET':
		return render_template('home.html', form=form)
		
@app.route('/signup', methods=['GET', 'POST'])
def signup():
	form = SignupForm()
	
	if request.method == 'POST':
		if form.validate() == False:
			return render_template('signup.html', form=form)
		else:
			newuser = User(form.firstname.data, form.lastname.data, form.email.data, form.password.data)
			db.session.add(newuser)
			db.session.commit()

			session['email'] = newuser.email			
			return redirect(url_for('profile'))		
			
	elif request.method == 'GET':
		return render_template('signup.html', form=form)
		
@app.route('/signout')
def signout():
	
	if 'email' not in session:
		return redirect(url_for('signin'))
		
	session.pop('email', None)
	return redirect(url_for('home'))
	
if __name__ == '__main__':
	app.run(debug=True)
	
@app.route('/testdb')
def testdb():
	if db.session.query("1").from_statement("SELECT 1").all():
		return render_template('database.html', works=True)
	else:
		return render_template('database.html', works=False)















