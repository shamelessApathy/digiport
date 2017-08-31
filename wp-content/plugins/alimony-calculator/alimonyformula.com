function alimony(form)
{
	form.years.value = form.years.value.replace(/[^\d\.\-\ ]/g, '');
	form.payorgross.value = form.payorgross.value.replace(/[^\d\.\-\ ]/g, '');
	form.payeegross.value = form.payeegross.value.replace(/[^\d\.\-\ ]/g, '');
	form.payornet.value = form.payornet.value.replace(/[^\d\.\-\ ]/g, '');
	form.payeenet.value.value = form.payeenet.value.replace(/[^\d\.\-\ ]/g, '');
	
	if (form.years.value.length==0) {form.years.value = 0;}	
	if (form.payorgross.value.length==0) {form.payorgross.value = 0;}	
	if (form.payeegross.value.length==0) {form.payeegross.value = 0;}	
	if (form.payornet.value.length==0) {form.payornet.value = 0;}	
	if (form.payeenet.value.length==0) {form.payeenet.value = 0;}	
	
	var y = parseFloat(form.years.value);
	var h = parseFloat(form.payorgross.value);
	var w = parseFloat(form.payeegross.value);
	var p = parseFloat(form.payornet.value);
	var q = parseFloat(form.payeenet.value);
	var MBA = '';
	var old = '';
	var Gin = '';
	var AAM = '';
	var AZ = '';
	var CA = '';
	var KS = '';
	var PA = '';
	var VA = '';
	var TX = '';
	var a = '';
	var b = '';
	var c = '';
	var d = '';
	
	MBA = ((h - w) * 0.35)
	if (MBA < 0) { MBA = 0.00;}
	MBA = parseInt(MBA + .5);
	form.MBAa.value = MBA;
	b = ((h - w) * 0.35) / 52
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.MBAwk.value = b;
	b = h - MBA
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.MBAh.value = b; 
	b = w + MBA
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.MBAw.value = b;

	old = ((h + w) / 3) - w
	if (old < 0) { old = 0.00;}
	old = parseInt(old + .5);
	form.olda.value = old;
	b = (((h + w) / 3) - w) / 52
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.oldwk.value = b;
	b = h - old
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.oldh.value = b; 
	b = w + old
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.oldw.value = b; 
	
	Gin = h - ((h + w) / 1.8)
	if (y < 5) {Gin = 0}
	if (Gin < 0) { Gin = 0.00;}
	Gin = parseInt(Gin + .5);
	form.Ginsburga.value = Gin;
	b = (h - ((h + w) / 1.8)) / 52
	if (y < 5) {b = 0}
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.Ginsburgwk.value = b;
	b = h - Gin
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.Ginsburgh.value = b; 
	b = w + Gin
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.Ginsburgw.value = b; 
	
	a = (h * 0.3) - (w * 0.2)
	c = (0.4 * (h + w)) - w
	if (a > c) {AAM = c} else {AAM = a}
	if (AAM < 0) { AAM = 0.00;}	
	AAM = parseInt(AAM + .5);
	form.AAMLa.value = AAM;
	b = AAM / 52
	b = parseInt(b + .5);
	form.AAMLwk.value = b;
	b = h - AAM
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.AAMLh.value = b; 
	b = w + AAM
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.AAMLw.value = b; 
	
	if ((y * 0.015) > 0.5) {a = (h - w) * 0.5} else {a = (h - w) * (y * 0.015)}
	if (y < 5) {d = 0} else {d = a}
	if ((h * 0.75) > w) {AZ = d} else {AZ = 0}
	if (AZ < 0) { AZ = 0.00;}	
	AZ = parseInt(AZ + .5);
	form.Arizonaa.value = AZ;
	b = AZ / 52
	b = parseInt(b + .5);
	form.Arizonawk.value = b;
	b = h - AZ
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.Arizonah.value = b; 
	b = w + AZ
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.Arizonaw.value = b; 
	
	CA = (p * 0.4) - (q * 0.5)
	if (CA < 0) { CA = 0.00;}	
	CA = parseInt(CA + .5);
	form.CAa.value = CA;
	b = CA / 52
	b = parseInt(b + .5);
	form.CAwk.value = b;
	b = h - CA
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.CAh.value = b; 
	b = w + CA
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.CAw.value = b; 
	 
	if ( (h - w) < 50000) {KS = (h - w ) * 0.25} else {KS = 12500 + ((h - w - 50000) * 0.22)}
	if (KS < 0) { KS = 0.00;}	
	KS = parseInt(KS + .5);
	form.KSa.value = KS;
	b = KS / 52
	b = parseInt(b + .5);
	form.KSwk.value = b;
	b = h - KS
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.KSh.value = b; 
	b = w + KS
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.KSw.value = b; 

	PA = (p - q) * 0.4
	if (PA < 0) { PA = 0.00;}	
	PA = parseInt(PA + .5);
	form.PAa.value = PA;
	b = PA / 52
	b = parseInt(b + .5);
	form.PAwk.value = b;
	b = h - PA
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.PAh.value = b; 
	b = w + PA
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.PAw.value = b; 

	TX = (h * 0.2)
	if (y < 10) {TX = 0;}
	if (TX > 60000) {TX = 60000;}
	if (TX < 0) { TX = 0.00;}
	TX = parseInt(TX + .5);
	form.TXa.value = TX;
	b = (h * 0.2) / 52
	if (y < 10) {b = 0;}
	if (b > 1153.85) {b = 1153.85;}
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.TXwk.value = b;
	b = h - TX
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.TXh.value = b; 
	b = w + TX
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.TXw.value = b; 
	
	VA = (h * 0.3) - (w * 0.5)
	if (VA < 0) { VA = 0.00;}	
	VA = parseInt(VA + .5);
	form.VAa.value = VA;
	b = VA / 52
	b = parseInt(b + .5);
	form.VAwk.value = b;
	b = h - VA
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.VAh.value = b; 
	b = w + VA
	if (b < 0) { b = 0.00;}
	b = parseInt(b + .5);
	form.VAw.value = b; 

	if ((y * 12) <= 240) {a = y * 0.8 * 12}
	if ((y * 12) <= 180) {a = y * 0.7 * 12}
	if ((y * 12) <= 120) {a = y * 0.6 * 12}
	if ((y * 12) <= 60) {a = y * 0.5 * 12}
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	if (y > 20) {b = "indefinite"}
	form.MBAm.value = b;
	if ((y * 12) <= 240) {a = y * 0.8}
	if ((y * 12) <= 180) {a = y * 0.7}
	if ((y * 12) <= 120) {a = y * 0.6}
	if ((y * 12) <= 60) {a = y * 0.5}
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	if (y > 20) {b = "indefinite"}
	form.MBAy.value = b;
	
	if (y < 5) {a = 0} else {a = y * 12} 
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	if (y > 14.94) {b = "permanent"}
	form.Ginm.value = b;
	if (y < 5) {a = 0} else {a = y} 
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	if (y > 14.94) {b = "permanent"}
	form.Giny.value = b;

	if (y < 20) {a = y * 0.75 * 12}
	if (y < 10) {a = y * 0.5 * 12}
	if (y < 3) {a = y * 0.3 * 12}
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	if (y > 19.94) {b = "permanent"}
	form.AAMm.value = b;
	if (y < 20) {a = y * 0.75}
	if (y < 10) {a = y * 0.5}
	if (y < 3) {a = y * 0.3}
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	if (y > 19.94) {b = "permanent"}
	form.AAMy.value = b;

	if (y < 20) {a = y * y * 0.6} else {a = y * 12}
	if (y < 10) {a = y * 0.5 * 12}
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	form.CAm.value = b;
	if (y < 20) {a = y * y * 0.05} else {a = y}
	if (y < 10) {a = y * 0.5}
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	form.CAy.value = b;
	
	if (y < 5) {c = y * 4.8} else {c = 24 + ((y - 5) * 4)}
	if (c > 121) {a = 121} else {a = c}
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	form.KSm.value = b;
	if (y < 5) {c = y / 2.5} else {c = 2 + ((y - 5) / 3)}
	if (c > 10.0833) {a = 10.0833} else {a = c}	
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	form.KSy.value = b;

	if (y < 30) {a = 84} else {a = 120}
	if (y < 20) {a = 60}
	if (y < 10) {a = 0}
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	form.TXm.value = b;
	if (y < 30) {a = 7} else {a = 10}
	if (y < 20) {a = 5}
	if (y < 10) {a = 0}
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	form.TXy.value = b;

	if (y < 10) {c = 0} else {c = (y * 6)}
	if (c > 240) {a = 240} else {a = c}
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	form.MEm.value = b;
	if (y < 10) {c = 0} else {c = (y / 2)}
	if (c > 20) {a = 20} else {a = c}	
	a = parseInt((a + .05) * 10);
	a = a / 10;
	b = new String(a);
	if(b.indexOf('.') < 0) { b += '.0'; }
	if(b.indexOf('.') == (b.length - 1)) { b += '0'; }
	form.MEy.value = b;


	return false;