# -*- coding: utf-8 -*-
import scrapy
from MovieTimetable.items import MovietimetableItem


class MovietimetableSpider( scrapy.Spider ):
    name = 'movietimetable'
    start_urls = ['http://web.vscinemas.com.tw/vsTicketing/ticketing/ticket.aspx']

    def parse( self, response ):
        theater = response.xpath( '//select[@id="theater"]/option/@value' ).extract()
        theater_name = response.xpath( '//select[@id="theater"]/option/text()' ).extract()
        theater.pop( 0 )
        theater_name.pop( 0 )
        theater = [ self.start_urls[ 0 ] + '?cinema=' + i for i in theater ]
        for i in range( len( theater ) ):
            yield scrapy.Request( theater[ i ], callback = self.parse_movie, meta = { 'theater': theater_name[ i ] } )

    def parse_movie( self, response ):
        movie = response.xpath( '//ul[@class="movieList"]/li/a/@href' ).extract()
        movie_name = response.xpath( '//ul[@class="movieList"]/li/a/text()' ).extract()
        movie = [ self.start_urls[ 0 ] + i for i in movie ]
        for i in range( len( movie ) ):
            yield scrapy.Request( movie[ i ], callback = self.parse_time, meta = { 'theater': response.meta[ 'theater' ], 'movie': movie_name[ i ] } )

    def parse_time( self, response ):
        day = response.xpath( '//section[@class="movieTime"]/div/h4/text()' ).extract()
        time = [ 
            response.xpath( '//section[@class="movieTime"]/div/ul[' + str( i ) + ']/li/a/text()' ).extract()
            for i in range( len( day ) ) ]
        for i in range( len( day ) ):
            for j in range( len( time[ i ] ) ):
                item = MovietimetableItem()
                item[ 'movie' ] = response.meta[ 'movie' ]
                item[ 'theater' ] = response.meta[ 'theater' ]
                item[ 'day' ] = day[ i ]
                item[ 'time' ] = time[ i ][ j ]
                yield item

