import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Injectable } from "@nestjs/common";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID:
        "420861903648-mbguhfe3ohdhcj7va7hmnt6lfffcssin.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/redirect",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      
    };
    
    done(null, user);
  }
}
