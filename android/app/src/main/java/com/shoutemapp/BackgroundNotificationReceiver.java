package com.shoutemapp;

import android.annotation.SuppressLint;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

public class BackgroundNotificationReceiver extends BroadcastReceiver {
    private static final String TAG = "BackgroundNotificationReceiver";
    @SuppressLint("LongLogTag")
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();

        Log.d(TAG, "Remote message received for action " + action);

        if (action.equals("com.evollu.react.fcm.ReceiveNotification")) {
           Object data = intent.getExtras().getParcelable("data");

            if (data instanceof RemoteMessage) {
                RemoteMessage remoteMessage = (RemoteMessage) data;
                String title;
                String text;
                String id;

                if (remoteMessage.getNotification() != null) {
                    title = remoteMessage.getNotification().getTitle();
                    text = remoteMessage.getNotification().getBody();
                    id = remoteMessage.getMessageId();
                } else {
                    title = remoteMessage.getData().get("title");
                    text = remoteMessage.getData().get("text");
                    id = remoteMessage.getData().get("id");
                }

                Log.d(TAG, "From: " + remoteMessage.getFrom());
                Log.d(TAG, "Notification Message id: " + id);
                Log.d(TAG, "Notification Message Title: " + title);
                Log.d(TAG, "Notification Message Body/Text: " + text);
                Log.d(TAG, "Remote message received" + remoteMessage.toString());

                sendNotification(context, id, title, text, remoteMessage.getData());
            }
        }
    }

    private void sendNotification(Context context,String id, String title, String messageBody, Map<String, String> data) {
        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        Intent intent = getLaunchIntent(context);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        Bundle bundle = new Bundle();
        bundle.putBoolean("userInteraction", true);
        //TODO: add more stuff to bundle
        intent.putExtra("notification", bundle);

        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, id.hashCode(), intent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationManager notificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        NotificationCompat.Builder notificationBuilder;

        if (title != null && messageBody != null && id !=null && data != null) {
            notificationBuilder = new NotificationCompat.Builder(context)
                    .setSmallIcon(context.getApplicationInfo().icon)
                    .setContentTitle(title)
                    .setContentText(messageBody)
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(messageBody))
                    .setAutoCancel(true)
                    .setSound(defaultSoundUri)
                    .setContentIntent(pendingIntent);
        } else {
            notificationBuilder = new NotificationCompat.Builder(context)
                    .setSmallIcon(context.getApplicationInfo().icon)
                    .setContentTitle("Invalid title")
                    .setContentText("Invalid text")
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(messageBody))
                    .setAutoCancel(true)
                    .setSound(defaultSoundUri);
        }

        notificationManager.notify(notificationBuilder.hashCode(), notificationBuilder.build());
    }

    public Class getMainActivityClass(Context context) {
        String packageName = context.getPackageName();
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
        String className = launchIntent.getComponent().getClassName();
        try {
            return Class.forName(className);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    @NonNull
    private Intent getLaunchIntent(Context context) {
        return new Intent(context, getMainActivityClass(context));
    }
}
