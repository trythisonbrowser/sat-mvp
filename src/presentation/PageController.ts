import debug from 'debug';
import { Response } from 'express';
import { Controller, Get, QueryParam, Redirect, Render, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';

const logger = debug('PageController');

@Service() // Controller이지만 typedi 마킹을 위해 Service 표시
@Controller()
export class PageController {
  @Get('/')
  @Render('index')
  async renderIndexPage(@QueryParam('msg') msg: string, @Res() res) {
    res.locals.msg = msg;
  }

  @Get('/login')
  @Render('login')
  async renderLoginPage(@QueryParam('msg') msg: string, @Res() res) {
    res.locals.msg = msg;
  }

  @Get('/signup')
  @Render('signup')
  async renderSignupPage(@QueryParam('msg') msg: string, @Res() res) {
    res.locals.msg = msg;
  }

  @Get('/logout')
  @Redirect('/')
  async logout(@Req() req, @Res() res: Response) {
    req.session.destroy(args => console.log(args));
    res.locals = {};
    logger('removed session & locals');
    // todo: nothing;
  }
}
