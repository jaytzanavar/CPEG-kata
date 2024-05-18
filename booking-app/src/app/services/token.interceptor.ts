import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth_token = '123123123123'

  const authReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${auth_token}`
    }
  })

  return next(authReq);
};
