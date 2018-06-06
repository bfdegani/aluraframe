class DateHelper {

  constructor(){
    throw new Error ('DateHelper cannot be instantiated');
  }

  static text2Date(t){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(t))
      throw new Error('Invalid date format. Please use yyyy-mm-dd');

    return new Date(t.split('-'));
  }

  static date2Text(d){
    //return d.getDate() + '/' + ( 1 + d.getMonth()) + '/' + d.getFullYear();
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; //usando template string
  }
}
