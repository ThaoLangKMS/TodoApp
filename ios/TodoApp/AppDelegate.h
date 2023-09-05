#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <GoogleSignIn/GoogleSignIn.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [GIDSignIn.sharedInstance handleURL:url];
}

@interface AppDelegate : RCTAppDelegate

@end
