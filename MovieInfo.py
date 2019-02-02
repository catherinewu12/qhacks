import requests
from bs4 import BeautifulSoup as bs

#page = requests.get("https://www.imdb.com/title/tt0111161/")
#soup = bs(page.content, 'html.parser')

def convertMovieNameToSearch(name):
    base = "https://www.google.com/search?q=imdb+"
    terms = name.replace(' ', '+')
    return base+terms



def getLink(name):
    searchUrl = convertMovieNameToSearch(name)
    print(searchUrl)
    page = requests.get(searchUrl)
    soup = bs(page.content, 'html.parser')
    h3 = soup.find('h3', attrs={'class':'r'})
    linkDatum = h3.find('a')
    link = linkDatum.attrs['href'][7:]
    link = link[:37]
    return link

def returnDataFromName(name):
    m = Movie(getLink(name))
    return [m.get_character_list(), m.get_actors()]



class Movie:
    def __init__(self, url):
        self.url = url
        self.full_cast_url = url+"fullcredits/?ref_=tt_ov_st_sm"
        self.page = requests.get(self.url)
        self.full_cast_page = requests.get(self.full_cast_url)
        self.soup = bs(self.page.content, 'html.parser')
        self.full_cast_soup = bs(self.full_cast_page.content, 'html.parser')
        #print(self.full_cast_soup)
        self.get_title_yr(self.soup)
        self.get_rating(self.soup)

    def get_title_yr(self, soup):
        self.title_and_yr= soup.find('h1').text
        self.title = self.title_and_yr[:-8]
        self.yr = self.title_and_yr[-6:-2]
        return self.title, self.yr

    def get_rating(self, soup):
        try:
            self.rating = soup.find('span', attrs={'itemprop':'ratingValue'}).text
        except:
            self.rating = 'None'
        return self.rating

    def get_character_list(self):
        self.chars = []
        # try:
        self.characterTds = self.full_cast_soup.findAll('td', attrs={'class':'character'})
        for character in self.characterTds:
            children = character.findChildren("a")
            for child in children:
                self.chars.append(child.contents[0])
        return self.chars

    def get_actors(self):
        self.actors = []
        actorTable = self.full_cast_soup.find('table', attrs={
            'class': 'cast_list'})
        actorImgs = actorTable.findAll('img', attrs={'class':'loadlate'})
        for actor in actorImgs:
            self.actors.append(actor.attrs['title'])
        return self.actors

    def output_details(self):
        details = "Title: {}, Year: {}, Rating: {}".format(self.title, self.yr, self.rating)
        return details

#m = Movie("https://www.imdb.com/title/tt0111161/")
#print(m.title)
#print(m.yr)
#print(m.rating)

def number_to_url(num):
    missingDigits = 7-len(str(num))
    newNum = str(num)
    if missingDigits>0:
        for x in range(missingDigits):
            newNum = '0'+newNum
    url = "https://www.imdb.com/title/tt"+ newNum + "/"
    return url


for x in returnDataFromName('harry potter deathly'):
    print(x)
